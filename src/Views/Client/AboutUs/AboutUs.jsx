import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="main">
      <div class="wrapper">
        <header class="backgroundTitle">Conocenos</header>
        <aside class="aside aside-1">Aside 1</aside>
        <aside class="aside aside-2">Aside 2</aside>
        <article class="mainArticle">
          <h1>Nuestra Historia</h1>
          <p className="paragraph">
            Fue fundado en 1689; en el recuento de población de 1791 era
            cabecera de curato; el 14 de abril de 1861 se le dio categoría de
            municipio con el nombre ale San José de Siguatepeque. Se le dio el
            título de ciudad el 9 de abril de 1926, con el nombre de
            Siguatepeque. El 12 de noviembre de 1940 se crea el Distrito Local
            de Siguatepeque, compuesto por el municipio de Siguatepeque. En 1957
            se devuelve la autonomía municipal. El origen de su nombre
            significa: "CERRO DE LA MUJER"
          </p>
          <p className="paragraph">
            El actual emplazamiento de siguatepeque era habitado por indígenas
            de la etnia lenca que vivían en casas de paja en la rivera de ríos y
            riachuelos. De este grupo humano asi como de las etnias mayas han
            sido hallados unos utensilios como piedras de moler, vasijas,
            jarrones, ollas, objetos de adornos para salas, imágenes de ídolos
            de diferentes formas y tamaños.
          </p>
          <div className="imageContainer">
            <img
              class="image1"
              src="/about/sample.png"
              alt="1"
              width="200"
              height="200"
            />
            <img
              class="image1"
              src="/about/sample.png"
              alt="1"
              width="200"
              height="200"
            />
          </div>
          <p className="paragraph">
            Siguatepeque se cree que fue fundada inicialmente por indios de
            origen lenca, por el año de 1689 y ya para el año de 1788 ,
            Siguetepeque formaba parte de un cuarto de seis cofradías y contaba
            con las siguientes aldeas: Jaitique, Meambar y Taulabe el libro de
            registros mas antiguos de la época que se ha encontrado data de los
            años 1850, formando este parte del archivo de la municipalidad el 14
            de abril de 1861 se le dio a siguatepeque la categoría de municipio
            del departamento de comayagua, inicialmente se le dio en nombre de
            San Jose de Siguatepeque para el año de 1889 pierde como municipio
            la aldea de Meambar la que se constituye a la vez como municipio ese
            mismo año (1889), Siguatepeque se convierte en capital religiosa del
            país , al instante en el lugar el obispo de Honduras Fray Manuel
            Francisco Velez quien había adquirido el inmueble del que fue el
            antiguo edificio del instituto Genaro Muñoz Hernández el cual era en
            esos tiempos casa de retiros para los sacerdotes de su parroquia.
          </p>
        </article>
        <footer class="footer">Footer</footer>
      </div>
    </div>
  );
};

export default AboutUs;
