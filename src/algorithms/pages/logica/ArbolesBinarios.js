"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbolesBinarios = void 0;
/**
 * Clase que permite la ejecución del algoritmo para conseguir el árbol binario
 * de búsqueda óptimo.
 */
var ArbolesBinarios = /** @class */ (function () {
    function ArbolesBinarios(keys) {
        this.keys = [];
        this.orderedKeys = [];
        this.keys = keys;
        this.orderedKeys = JSON.parse(JSON.stringify(this.keys));
        this.orderKeys();
        this.getProbs();
    }
    /**
     * El algoritmo realiza:
     *  1) Crea las matrices A y R con valores por defecto.
     *  2) Inicializa los valores triviales de la matriz
     *  3) Para cada p (diferencia entre una llave y otra 1, 2 -> p = 2) para ir por diagonales
     *      para cada i desde 1 hasta n;
     *          si i + p <= n entonces
     *              j = i + p
     *              * con el j ya podemos buscar los resultados para cada k desde i hasta j
     *              * escoger el mínimo y setear los valores de A y R
     */
    ArbolesBinarios.prototype.execute = function () {
        var n = this.orderedKeys.length;
        // +2 because we need a row 0 that is not used but need for indexing
        this.A = this.create_matrix(n + 2, n + 1);
        this.R = this.create_matrix(n + 2, n + 1);
        this.init_values(this.orderedKeys, this.A, this.R, n + 1);
        // let p be the differences between k's 1,2 -> p = 2 1,4 -> p = 3
        for (var p = 1; p < n; p++) {
            for (var i = 1; i < n; i++) {
                if (i + p <= n) {
                    var j = i + p;
                    var ks = this.search_ks(this.orderedKeys, this.A, i, j);
                    var chosen = this.getMin(ks);
                    this.A[i][j] = chosen;
                    var chosen_k = ks.indexOf(chosen);
                    this.R[i][j] = chosen_k + i;
                }
            }
        }
        this.A.shift();
        this.R.shift();
    };
    /**
     * Esta función permite conocer los valores del algoritmo de cada k desde i hasta j.
     * @param keys Llaves del árbol
     * @param A Matriz resultado
     * @param i posición i de las llaves
     * @param j posición j de las llaves
     */
    ArbolesBinarios.prototype.search_ks = function (keys, A, i, j) {
        var ks = []; // Para guardar los ks resultado
        var probs_sum = 0; // Para conseguir la suma de probabilidades desde i hasta j (inclusivo)
        for (var k = i; k < j + 1; k++) {
            probs_sum += Number(keys[k - 1].prob);
        }
        for (var k = i; k < j + 1; k++) { // + 1 -> 1 because we have (j - i) + 1 k's... 1 -> because we need it inclusive    
            var res = A[i][k - 1] + A[k + 1][j] + probs_sum;
            res = Math.round(res * 10000.0) / 10000.0; // Para redondear a 4 decimales
            ks.push(res);
        }
        return ks;
    };
    /**
     * Inicializa los valores triviales de la matriz. Es decir, la diagonal en 0 y la siguiente diagonal
     * con los valores de cada probabilidad de cada llave, además, también setea estos valores por defecto en
     * la matriz R, es decir, 0 en la diagonal y el número de llave correspondiente en la siguietne diagonal.
     * @param keys Lista de llaves
     * @param A Matriz resultado
     * @param R Matriz R
     * @param n cantidad de llaves más 1
     */
    ArbolesBinarios.prototype.init_values = function (keys, A, R, n) {
        for (var i = 1; i < n; i++) {
            A[i][i - 1] = 0;
            R[i][i - 1] = 0;
            A[i][i] = Number(keys[i - 1].prob);
            R[i][i] = i;
        }
        A[n][n - 1] = 0;
        R[n][n - 1] = 0;
    };
    /**
     * Crea una matriz con valor "" en cada celda
     * @param n número de filas
     * @param m número de columnas
     */
    ArbolesBinarios.prototype.create_matrix = function (n, m) {
        var matrix = [];
        for (var i = 0; i < n; i++) {
            matrix.push(new Array(m).fill(""));
        }
        return matrix;
    };
    /**
     * Ordena las llaves en orden ascendente (lexicográfico)
     */
    ArbolesBinarios.prototype.orderKeys = function () {
        this.orderedKeys.sort(function (a, b) {
            if (a === b) {
                return 0;
            }
            return a.code < b.code ? -1 : 1;
        });
    };
    /**
     * Obtiene las probabilidades para cada llave haciendo el cálculo con la
     * cantidad total de los pesos.
     */
    ArbolesBinarios.prototype.getProbs = function () {
        var allHeights = 0;
        this.orderedKeys.forEach(function (key) { return allHeights += Number(key.height); });
        this.orderedKeys.forEach(function (key) {
            key.prob = Math.round((Number(key.height) / allHeights) * 10000.0) / 10000.0;
        });
    };
    /**
     * Obtiene el mínimo valor en un arreglo de enteros.
     * @param arrayL Arreglo de enteros.
     */
    ArbolesBinarios.prototype.getMin = function (arrayL) {
        var min = arrayL[0];
        arrayL.forEach(function (value) {
            if (Number(value) < Number(min)) {
                min = value;
            }
        });
        return min;
    };
    /**
     * Crea una estructura de árbol analizando la tabla R del algoritmo.
     * @param RTable Tabla R
     */
    ArbolesBinarios.prototype.getBinaryTreeArray = function (RTable) {
        var root = RTable[0][RTable[0].length - 1];
        var tree = {
            value: root,
            left: this.getBinaryTreeArrayAux(RTable, 1, root - 1),
            right: this.getBinaryTreeArrayAux(RTable, root + 1, RTable.length - 1)
        };
        return tree;
    };
    /**
     * Método auxiliar y recursivo para crear un nodo a partir del análisis de la tabla R
     * y una posición i y j en la matriz. Recursiva al utilizar una llamada a sí misma para averiguar los hijos
     * derecho e izquierdo de un nodo.
     * @param RTable
     * @param i
     * @param j
     */
    ArbolesBinarios.prototype.getBinaryTreeArrayAux = function (RTable, i, j) {
        var newK = RTable[i - 1][j];
        if (newK == 0) {
            return null;
        }
        var node = {
            value: newK,
            left: this.getBinaryTreeArrayAux(RTable, i, newK - 1),
            right: this.getBinaryTreeArrayAux(RTable, newK + 1, j)
        };
        return node;
    };
    return ArbolesBinarios;
}());
exports.ArbolesBinarios = ArbolesBinarios;
