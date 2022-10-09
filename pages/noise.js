import React, {useEffect, useState, useRef} from "react";
import perlin from "../components/PerlinNoise";

function Noise() {
    const [currentAlgo, changeAlgo] = useState('Perlin')
    const [currentRepresentation, changeRepresentation] = useState('Estática')
    const [map2D, changeMap] = useState([])
    const canvasRef = useRef(null)
    const staticColors = ['#000000','#444444','#888888','#bbbbbb','#ffffff']

    useEffect(() => {
        let newMap = []
        for(let i=0; i<50; i++){
            let row = []
            for(let y=0; y<150; y++){
                row.push({noise:0})
            }
            newMap.push(row)
        }
        changeMap(newMap)
    }, [currentRepresentation])

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        for(let y=0; y<map2D.length; y++){
            for(let x=0; x<map2D[y].length; x++){
                context.fillStyle = staticColors[map2D[y][x].noise]
                context.fillRect(x*2, y*2, 2, 2)
            }
        }
    }, [map2D])

    function randomNoise(){
        let newMap = []
        for(let i=0; i<50; i++){
            let row = []
            for(let y=0; y<150; y++){
                row.push({noise:0})
            }
            newMap.push(row)
        }
        newMap.forEach((row,y) => {
            row.forEach((cell,x) => {
                let noiseValue = Math.random()
                newMap[y][x].noise = noiseValue
            })
        })
        changeMap(newMap)
    }

    function perlinNoise2D(){
        let newMap = []
        for(let i=0; i<50; i++){
            let row = []
            for(let y=0; y<150; y++){
                row.push({noise:0})
            }
            newMap.push(row)
        }
        newMap.forEach((row,y) => {
            row.forEach((cell,x) => {
                // converter range do perlin noise {-sqrt(2)/2, sqrt(2)/2} para {-1,1}
                let noiseValue = perlin.get((x+0.5)/7, (y+0.5)/7)*1.41
                let actualValue = noiseValue
                if(noiseValue<1){actualValue = 4}
                if(noiseValue<0.6){actualValue = 3}
                if(noiseValue<0.2){actualValue = 2}
                if(noiseValue<-0.2){actualValue = 1}
                if(noiseValue<-0.6){actualValue = 0}
                newMap[y][x].noise = actualValue
            })
        })
        perlin.seed()
        changeMap(newMap)
    }

    function perlinNoise1D(){

    }

    function runAlgorithm(){
        switch(currentAlgo){
            case 'Perlin':
                perlinNoise2D()
                break
            case 'Random':
                randomNoise()
                break
        }
    }

    return (
        <div className="sorting">
            <div className="titledisplay">
                <select onChange={e => changeAlgo(e.target.value)}>
                    <option defaultValue value='Perlin'>Perlin</option>
                    <option value='Random'>Random</option>
                </select>
                <div className="algotitle">{currentAlgo}</div>
            </div>
            <canvas className="noisecanvas" ref={canvasRef}></canvas>
            <div className="algobuttons">
                <select onChange={e => changeRepresentation(e.target.value)}>
                    <option defaultValue value='Estática'>Estática</option>
                    <option value='Terreno'>Terreno</option>
                    <option value='Mapa topográfico'>Mapa topográfico</option>
                    <option value='Linha 1D'>Linha</option>
                </select>
                <button onClick={runAlgorithm}>Gerar ruído</button>
            </div>
        </div>
    );
}

export default Noise;