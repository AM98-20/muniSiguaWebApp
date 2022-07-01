import Page from '../Components/Page/Page'
const splashStyle = {
  backgroundColor:'#000',
  color:'#fff',
  display:"flex",
  alignItems:'center',
  justifyContent:'center',
  flex:1,
  flexDirection:'column',
  minHeight:'100vh'
}
const Splash = ()=>{
  return(
    <Page>
      <section style={splashStyle}>
       <h2>Municipalidad de Siguatepeque</h2>
       <h3>Cargando ...</h3>
      </section>
    </Page>
  )
}

export default Splash;