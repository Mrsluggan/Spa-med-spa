import React from 'react'

export default function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <span style={{ fontSize: '30px', textAlign: 'center' }}> Ta en titt på våra tjänster! </span>
      <div style={{ display: 'flex', textAlign: 'left', alignItems: 'center', justifyContent: 'center' }}>

        <div className='text'>
          <img src='/Gurka.jpg'></img>
          Gurka från ica, skuren av våran receptionist med något vast. Det sägs att gurka har mer vatten i sig än havet, enligt receptionisten.
          <br></br>
        </div>
        <div className='text'>
          <img src='/PoolRelax.webp'></img>
          DELUX spa med kallavfettning och stålborste, sedan hoppa ner i polen med före detta brottsling Jörgen. Om du har tur kommer han berätta historier om tiderna före fängelset
        </div>
        <div className='text'>
          <img src='/BeforeAfter.PNG'></img>
          Detta är vår dubbel trubbel massage med spår av kärnbränsle. Det kommer få kroppen att utvecklas på sett bara magiker kan
        </div>


      </div>

      <h2>Komma och boka tid med oss!</h2>
      <button style={{ width: '10%', height: '10%', fontSize: '20px' }} onClick={() => window.location.href = '/calender'}>Boka!</button>

    </div >
  )
}
