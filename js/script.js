class Dijkstra {
    constructor(simpul, graf) {
        this.simpul = simpul;
        this.graf = graf;
    }

    mencari_rute(start, end) {
        let unvisited_simpul = {};
        for (let n of this.simpul) {
            unvisited_simpul[n] = Infinity;
        }
        unvisited_simpul[start] = 0;

        let visited_simpul = {};
        let parents = {};

        while (Object.keys(unvisited_simpul).length > 0) {
            let min_vertex = Object.keys(unvisited_simpul).reduce((a, b) => unvisited_simpul[a] < unvisited_simpul[b] ? a : b);

            if (min_vertex === end) {
                visited_simpul[min_vertex] = unvisited_simpul[min_vertex];
                break;
            }

            for (let [neighbour, weight] of Object.entries(this.graf[min_vertex] || {})) {
                if (neighbour in visited_simpul) {
                    continue;
                }

                let jalur_baru = unvisited_simpul[min_vertex] + weight;
                if (jalur_baru < unvisited_simpul[neighbour]) {
                    unvisited_simpul[neighbour] = jalur_baru;
                    parents[neighbour] = min_vertex;
                }
            }

            visited_simpul[min_vertex] = unvisited_simpul[min_vertex];
            delete unvisited_simpul[min_vertex];
        }

        return [parents, visited_simpul];
    }

    static jalur_dilewati(parents, start, end) {
        let jalur = [end];
        while (true) {
            let key = parents[jalur[0]];
            jalur.unshift(key);
            if (key === start) {
                break;
            }
        }
        return jalur;
    }

    static cetak_jalur_dan_jarak(jalur, graf) {
        let total_jarak = 0;
        let hasil = [];
        for (let i = 0; i < jalur.length - 1; i++) {
            let simpul_asal = jalur[i];
            let simpul_tujuan = jalur[i + 1];
            let jarak = graf[simpul_asal][simpul_tujuan];
            hasil.push(`${simpul_asal} -> ${simpul_tujuan} : ${jarak}`);
            total_jarak += jarak;
        }
        hasil.push(`Total jarak: ${total_jarak.toFixed(2)}`);
        return hasil
}
}

const input_simpul = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ', 'KK', 'LL', 'MM', 'NN', 'OO', 'PP'];

const input_graf = {
'A': {'B': 0.283, 'D': 1.85, 'G': 0.391},
'B': {'A': 0.283, 'C': 0.315, 'F': 0.408},
'C': {'B': 0.315, 'E': 0.413},
'D': {'A': 1.85, 'M': 0.95},
'E': {'C': 0.413, 'H': 0.501, 'F': 0.316},
'F': {'B': 0.408, 'E': 0.316, 'G': 0.264},
'G': {'A': 0.391, 'F': 0.264, 'I': 0.518},
'H': {'E': 0.501, 'I': 0.95, 'J': 0.158},
'I': {'G': 0.518, 'H': 0.95, 'L': 0.129},
'J': {'H': 0.158, 'K': 0.296, 'O': 0.549},
'K': {'J': 0.296, 'L': 0.291, 'P': 0.55},
'L': {'I': 0.129,'K': 0.291, 'Q': 0.556, 'M': 1.87},
'M': {'D': 0.95, 'L': 1.87, 'N': 2.32},
'N': {'M': 2.32, 'R': 1.28},
'O': {'J': 0.549, 'P': 0.283, 'S': 1.23},
'P': {'K': 0.55, 'O': 0.283, 'Q': 0.289},
'Q': {'L': 0.556, 'P': 0.289, 'U': 1.19},
'R': {'N': 1.28, 'W': 1.37},
'S': {'O': 1.23, 'T': 0.635, 'X': 0.766},
'T': {'S': 0.635, 'U': 0.188, 'Y': 0.745},
'U': {'Q': 1.19, 'T': 0.188, 'V': 0.836},
'V': {'U': 0.836, 'W': 1.2, 'AA': 0.73},
'W': {'R': 1.37, 'V': 1.2, 'HH': 1.54},
'X': {'S': 0.766, 'Y': 0.643, 'EE': 0.757},
'Y': {'T': 0.745, 'X': 0.643, 'Z': 0.138},
'Z': {'Y': 0.138, 'FF': 0.751, 'AA': 0.895},
'AA': {'V': 0.73, 'Z': 0.895, 'BB': 0.311},
'BB': {'AA': 0.311, 'PP': 0.41},
'PP': {'BB': 0.41, 'CC': 0.9},
'CC': {'PP': 0.9, 'GG': 0.339},
'DD': {'EE': 1.32, 'II': 1.31},
'EE': {'X': 0.757, 'DD': 1.32, 'FF': 0.795},
'FF': {'Z': 0.751, 'GG': 1.1, 'EE': 0.795},
'GG': {'CC': 0.339, 'FF': 1.1, 'HH': 0.407},
'HH': {'GG': 0.407, 'W': 1.54, 'LL': 2.16},
'II': {'DD': 1.31, 'JJ': 0.923, 'MM': 2.08},
'JJ': {'II': 0.923, 'KK': 0.498},
'KK': {'JJ': 0.498, 'LL': 1.32},
'LL': {'KK': 1.32, 'HH': 2.16, 'OO': 1.5},
'MM': {'II': 2.08, 'NN': 1.95},
'NN': {'MM': 1.95, 'OO': 0.37},
'OO': {'NN': 0.37, 'LL': 1.5},
};

function findShortestPath() {
    const startNode = document.formDijkstra.startNode.value.toUpperCase();
    const endNode = document.formDijkstra.endNode.value.toUpperCase();
    
    const dijkstra = new Dijkstra(input_simpul, input_graf);
    const [parents, visited_simpul] = dijkstra.mencari_rute(startNode, endNode);
    const jalur = Dijkstra.jalur_dilewati(parents, startNode, endNode);
    const hasil = Dijkstra.cetak_jalur_dan_jarak(jalur, input_graf);
    
    document.getElementById("hasilJalurDijkstra").value = hasil;
}