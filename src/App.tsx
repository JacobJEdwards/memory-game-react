import { useState } from 'react'
import './App.css'


type TCell = {
  number: number,
  index: number
}

function App() {
  const [deck, setDeck] = useState([
    0, 1,
    0, 1,
  ])

  const [flipped, setFlipped] = useState([...deck].map(entry => false))

  const [previousClick, setPreviousClick] = useState<TCell | undefined>(undefined);

  function handleCardClick(index: number) {
    const clickedNumber = deck[index]
    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);
    
    

    if (previousClick) {
      if (previousClick.number !== clickedNumber) {

        setTimeout(() => {
          newFlipped[index] = false;
          newFlipped[previousClick.index] = false;
          setFlipped([...newFlipped])
        }, 1000)
      } else {
        if (flipped.every(value => value)) {
          alert('you win')
        }
      }

      setPreviousClick(undefined);
    } else {
      setPreviousClick({
        number: clickedNumber,
        index: index
      });
    }


  }

  return (
    <div className="App">
      <div>
        <div className="deck">
          {deck.map((number, index) => (
            <div className="card" key={index} onClick={() => handleCardClick(index)}>
              {flipped[index] ? number : " "}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
