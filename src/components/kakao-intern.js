const n = 3;
const start = 1;
const end = 3;
const roads = [[1,2,2],[3,2,3]];
const traps = [2];

// const n = 4;
// const start = 1;
// const end = 4;
// const roads = [[1,2,1],[3,2,1],[2,4,1]];
// const traps = [2,3];

const disInfo = Array(n).fill(null).map(() => Array(n).fill(Infinity));
for(const road of roads) {
  if(disInfo[road[0]-1][road[1]-1] > road[2]) disInfo[road[0]-1][road[1]-1] = road[2];
}
// console.log(disInfo)

// const disFromBasis = Array(n).fill(null).map(() => Array(2).fill(null)); //[1] is reversed
const disFromBasis = Array(n).fill(null); 
// const reversedisFromBasis = Array(n);
const visited = Array(n).fill(false);
const reversed = Array(n).fill(false);

const getShortest = () => {
  let min = Infinity;
  let index;
  for(let i=0; i < n; i++) {
    if(disFromBasis[i] <= min && !visited[i] ) {
      min = disFromBasis[i];
      index = i;
    }
  }
  return index;
}

const additionalDis = (node) => {
  let min = Infinity;
  for(const trap of traps) {
    if(disInfo[trap][node] < min) {
      min = disInfo[trap][node]
    }
  }
  // console.log("add: " + min)
  return min;
}

visited[start - 1] = true;
for(let i = 0; i < n; i++) {
  disFromBasis[i] = disInfo[start-1][i];
}


for(let i = 0; i < 1; i++) {
  let isReverse = undefined;
  const nextNode = getShortest();
  console.log(" ?? next node: " + nextNode)
  console.log(disFromBasis[3])
  console.log(visited)
  console.log(reversed)
  if(traps.includes(nextNode + 1)) {
    isReverse = true; 
    reversed[nextNode] = !reversed[nextNode];
  }
  console.log(isReverse);
  visited[nextNode] = true;
  for(let j = 0; j < n; j++) {
    if(!visited[j]) {
    // if(1) {
      if(reversed[nextNode]) {
        console.log("reversed, j " + j)
        console.log(disInfo[j][nextNode])
        console.log(disInfo[j][nextNode] !== Infinity)
        if(disInfo[j][nextNode] !== Infinity) {
          if(disFromBasis[nextNode] + disInfo[j][nextNode] < disFromBasis[j]) {
            disFromBasis[j] = disFromBasis[nextNode] + disInfo[j][nextNode];
          }
        } else if(additionalDis(nextNode)){
          console.log("addtional: " + j)
          if(disFromBasis[nextNode] + disInfo[nextNode][j] + 2*additionalDis(nextNode) < disFromBasis[j]) {
            console.log("hmmm")
            console.log(disFromBasis[nextNode] + ", " +disInfo[nextNode][j]+ " , " + additionalDis(nextNode))
            disFromBasis[j] = disFromBasis[nextNode] + disInfo[nextNode][j] + 2*additionalDis(nextNode);
            console.log(disFromBasis)
          }
        }
        
        // if(disFromBasis[nextNode][0] + disInfo[nextNode][j] < disFromBasis[j][1]) disFromBasis[j][1] = disFromBasis[nextNode][0] + disInfo[nextNode][j];
        // if(disFromBasis[nextNode][1] + disInfo[j][nextNode] < disFromBasis[j][0]) disFromBasis[j][0] = disFromBasis[nextNode][1] + disInfo[j][nextNode];
      }
      else {
        console.log("orig")
        if(disInfo[nextNode][j] !== Infinity) {
          if(disFromBasis[nextNode] + disInfo[nextNode][j] < disFromBasis[j]) {
            disFromBasis[j] = disFromBasis[nextNode] + disInfo[nextNode][j];
          }
        } else if(additionalDis(nextNode)) {
          if(disFromBasis[nextNode] + disInfo[nextNode][j] + 2*additionalDis(nextNode) < disFromBasis[j]) {
            disFromBasis[j] = disFromBasis[nextNode] + disInfo[nextNode][j] + 2*additionalDis(nextNode);
          }
        }
      }
    }
  }
}
console.log('answer ' + Math.min(disFromBasis[end-1], disFromBasis[end-1]))
return Math.min(disFromBasis[end-1], disFromBasis[end-1])