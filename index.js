const cells=document.querySelectorAll('.cell')
const statusText=document.querySelector('#statusText')
const restartBtn=document.querySelector('#restartBtn')
console.log(cells)
const winningConditions=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

let options=["","","","","","","","",""]
let currentPlayer=0
let running=false

initializeGame()

function initializeGame(){
  currentPlayer=Math.floor(Math.random()*2)
  console.log(currentPlayer)
  if(currentPlayer==1){
    currentPlayer='X'
  }else{
    currentPlayer="O"
  }
  cells.forEach(cell=>cell.addEventListener('click',cellClicked))
  restartBtn.addEventListener('clicked',restartGame)
  statusText.textContent=`${currentPlayer}'s turn`
  running=true
  
}

function cellClicked(){
  const cellIndex=this.getAttribute("cellIndex")
  if(options[cellIndex]!=""||!running){
    return
  }
  upadateCell(this, cellIndex)
  
  checkWinner()
}

function upadateCell(cell, index){
  options[index]=currentPlayer
  cell.textContent=currentPlayer
  console.log(options)
  if(currentPlayer=="X"){
    cell.style.color="red"
  }else{
    cell.style.color="green"
  }
}

function changePlayer(){
  currentPlayer=(currentPlayer=="X")? "O":"X"
  statusText.textContent=`${currentPlayer}'s turn`
}

function checkWinner(){
  let roundWon=false
  for(let i=0;i<winningConditions.length;i++){
    const winningCells=winningConditions[i]
    const cellA=options[winningCells[0]]
    const cellB=options[winningCells[1]]
    const cellC=options[winningCells[2]]
    console.log(winningCells)
    
    if(cellA=='' || cellB=='' ||cellC==''){
      continue
    }
    if(cellA==cellB && cellB==cellC){
      roundWon=true
      break
    }
  }

  if(roundWon){
    statusText.textContent=`${currentPlayer} won`
    running=false
  }else if(!options.includes('')){
    statusText.textContent=`Draw`
    running=false
  }else{
    changePlayer()
  }
}
restartBtn.addEventListener('click',restartGame)

function restartGame(){
  currentPlayer=Math.floor(Math.random()*2)
  if(currentPlayer==1){
    currentPlayer='X'
  }else{
    currentPlayer="O"
  }
  options=["","","","","","","","",""]
  statusText.textContent=`${currentPlayer}'s turn`
  cells.forEach(cell=>cell.textContent="")
  running=true
}