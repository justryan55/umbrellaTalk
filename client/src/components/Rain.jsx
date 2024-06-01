import '../assets/styles/Rain.css'

export default function Rain() {
    const raindrops = Array.from({ length: 65 }, (_, i) => {
        let size = Math.random() * 5
        let posX = Math.floor(Math.random() * window.innerWidth) 
        let delay = Math.random() * -20  
        let duration = Math.random() * 13

        return (
            <i
                className='rain-drops'
                key={i}
                style={{
                    width: 0.2 + size +'px',
                    left: posX + 'px',
                    animationDelay: delay + 's',
                    animationDuration: duration + 's'

                }}
            ></i>
        )
    })

  return (
    <div className="rain-container">
        <div className="rain-content">
            {raindrops}
        </div>
    </div>  
)
}
