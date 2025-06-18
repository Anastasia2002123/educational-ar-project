// src/components/function-plotter.js

import * as THREE from '../../libs/three/build/three.module.js';
// ОНОВЛЕНО: Імпортуємо generateCurveGeometry та generateSurfaceGeometry
import { generateCurveGeometry, generateSurfaceGeometry } from '../utils/geometry-generator.js';

AFRAME.registerComponent('function-plotter', {
    schema: {
        type: { type: 'string', default: 'curve' }, // 'curve' or 'surface'
        formula: { type: 'string', default: 'x*x' },
        formulaY: { type: 'string', default: 'y' }, // For parametric curves
        formulaZ: { type: 'string', default: '0' }, // For parametric curves
        rangeStart: { type: 'number', default: -5 },
        rangeEnd: { type: 'number', default: 5 },
        rangeYStart: { type: 'number', default: -5 }, // For surfaces
        rangeYEnd: { type: 'number', default: 5 },   // For surfaces
        segments: { type: 'number', default: 50 },
        segmentsY: { type: 'number', default: 50 }, // For surfaces
        color: { type: 'color', default: '#FF0000' },
        wireframe: { type: 'boolean', default: false } // For surfaces
    },

    init: function () {
        this.mesh = null;
        // Передаємо wireframe до матеріалу при ініціалізації
        this.material = new THREE.MeshStandardMaterial({ color: this.data.color, side: THREE.DoubleSide, wireframe: this.data.wireframe });
        this.el.setObject3D('mesh', new THREE.Mesh(new THREE.BufferGeometry(), this.material)); // Ініціалізуємо з пустою геометрією
        this.update(); // Викликаємо update при ініціалізації, щоб створити початковий графік
    },

    update: function (oldData) {
        const data = this.data;
        const el = this.el;

        // Отримуємо поточний mesh
        this.mesh = el.getObject3D('mesh');

        // Якщо mesh не існує, створюємо його. Це має бути зроблено в init, але як fallback.
        if (!this.mesh) {
            this.material = new THREE.MeshStandardMaterial({ color: data.color, side: THREE.DoubleSide, wireframe: data.wireframe });
            this.mesh = new THREE.Mesh(new THREE.BufferGeometry(), this.material);
            el.setObject3D('mesh', this.mesh);
        }

        // Якщо змінився колір або каркас, оновлюємо матеріал
        if (!oldData || oldData.color !== data.color || oldData.wireframe !== data.wireframe) {
            this.mesh.material.color.set(data.color);
            this.mesh.material.wireframe = data.wireframe;
        }

        // Перевіряємо, чи потрібно перегенерувати геометрію
        const shouldUpdateGeometry =
            !oldData || // Якщо це перший update (при init)
            oldData.type !== data.type ||
            oldData.formula !== data.formula ||
            oldData.formulaY !== data.formulaY ||
            oldData.formulaZ !== data.formulaZ ||
            oldData.rangeStart !== data.rangeStart ||
            oldData.rangeEnd !== data.rangeEnd ||
            oldData.rangeYStart !== data.rangeYStart ||
            oldData.rangeYEnd !== data.rangeYEnd ||
            oldData.segments !== data.segments ||
            oldData.segmentsY !== data.segmentsY;

        if (shouldUpdateGeometry) {
            let geometry;
            if (data.type === 'curve') {
                // Використовуємо generateCurveGeometry для кривих
                geometry = generateCurveGeometry(
                    data.formula,
                    data.formulaY,
                    data.formulaZ,
                    data.rangeStart,
                    data.rangeEnd,
                    data.segments
                );
            } else if (data.type === 'surface') {
                // Використовуємо generateSurfaceGeometry для поверхонь
                geometry = generateSurfaceGeometry(
                    data.formula,
                    data.rangeStart, // xMin
                    data.rangeEnd,   // xMax
                    data.rangeYStart,
                    data.rangeYEnd,
                    data.segments,   // segmentsX
                    data.segmentsY   // segmentsY
                );
            } else {
                console.warn(`function-plotter: Unknown type '${data.type}'. Using default curve type.`);
                geometry = new THREE.BufferGeometry(); // Порожня геометрія для уникнення помилок
            }

            // Видаляємо стару геометрію, щоб запобігти витоку пам'яті
            if (this.mesh.geometry && this.mesh.geometry !== geometry) { // Додана перевірка на null/undefined та що геометрія дійсно нова
                this.mesh.geometry.dispose();
            }
            this.mesh.geometry = geometry;
        }
    },

    remove: function () {
        if (this.mesh && this.mesh.geometry) {
            this.mesh.geometry.dispose();
        }
        if (this.mesh && this.mesh.material) {
            this.mesh.material.dispose();
        }
        this.el.removeObject3D('mesh');
    }
});