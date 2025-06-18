// src/utils/geometry-generator.js

import * as THREE from '../../libs/three/build/three.module.js';
import { evaluateExpression, evaluateSurfaceExpression } from '../utils/math-parser.js'; // ОНОВЛЕНО: Імпорт правильних функцій

/**
 * Генерує геометрію для 2D або 3D кривої.
 * @param {string} formula - Формула для x-координати (або y=f(x)).
 * @param {string} formulaY - Формула для y-координати (для параметричних).
 * @param {string} formulaZ - Формула для z-координати (для параметричних).
 * @param {number} rangeStart - Початок діапазону для змінної (наприклад, x або t).
 * @param {number} rangeEnd - Кінець діапазону для змінної.
 * @param {number} segments - Кількість сегментів для генерації.
 * @returns {THREE.BufferGeometry}
 */
export function generateCurveGeometry(formula, formulaY = 'y', formulaZ = '0', rangeStart, rangeEnd, segments) {
    const points = [];
    const isParametric = formulaY !== 'y' || formulaZ !== '0';

    for (let i = 0; i <= segments; i++) {
        const t = rangeStart + (i / segments) * (rangeEnd - rangeStart);

        let x, y, z;

        if (isParametric) {
            x = evaluateExpression(formula, 't', t);
            y = evaluateExpression(formulaY, 't', t);
            z = evaluateExpression(formulaZ, 't', t);
        } else {
            // Це для випадку y = f(x)
            x = t;
            y = evaluateExpression(formula, 'x', t);
            z = 0; // Для 2D графіка Z завжди 0
        }

        // Додаємо точку до масиву
        points.push(new THREE.Vector3(x, y, z));
    }

    // Створюємо TubeGeometry для плавного графіка
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, segments, 0.02, 8, false); // radius: 0.02, radialSegments: 8

    return geometry;
}

/**
 * Генерує геометрію для 3D поверхні.
 * @param {string} formula - Формула для z=f(x,y).
 * @param {number} xMin - Мінімальне значення x.
 * @param {number} xMax - Максимальне значення x.
 * @param {number} yMin - Мінімальне значення y.
 * @param {number} yMax - Максимальне значення y.
 * @param {number} segmentsX - Кількість сегментів по осі X.
 * @param {number} segmentsY - Кількість сегментів по осі Y.
 * @returns {THREE.BufferGeometry}
 */
export function generateSurfaceGeometry(formula, xMin, xMax, yMin, yMax, segmentsX, segmentsY) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];

    const xStep = (xMax - xMin) / segmentsX;
    const yStep = (yMax - yMin) / segmentsY;

    for (let i = 0; i <= segmentsX; i++) {
        const x = xMin + i * xStep;
        for (let j = 0; j <= segmentsY; j++) {
            const y = yMin + j * yStep;
            const z = evaluateSurfaceExpression(formula, x, y); // Використовуємо evaluateSurfaceExpression

            vertices.push(x, y, z);

            if (i < segmentsX && j < segmentsY) {
                const a = i * (segmentsY + 1) + j;
                const b = a + (segmentsY + 1);
                const c = a + 1;
                const d = b + 1;

                // Two triangles forming a quad
                indices.push(a, b, c);
                indices.push(b, d, c);
            }
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals(); // Обчислення нормалей для коректного освітлення

    return geometry;
}