<template>
  <div class="d-flex flex-column justify-content-between">
    <div class="hlavicka">
      <header>
        <div>
          <b-navbar toggleable="lg" type="light" variant="light">
            <b-navbar-brand href="/"
              ><img src="assets/img/logo.png" alt="logo"
            /></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                <!-- Left aligned nav items -->
              </b-navbar-nav>

              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                <b-nav-item router-link to="/">Mapa</b-nav-item>
                <b-nav-item router-link to="/profiles"
                  >Profily vědců</b-nav-item
                >
                <b-nav-item router-link to="/calendar"
                  >Kalendář akcí</b-nav-item
                >
                <b-nav-item router-link to="/about">O projektu</b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div>
      </header>
      <img
        class="d-none d-lg-block d-xl-block"
        src="assets/img/jumbotron_desktop.png"
      />
      <img
        class="d-none d-md-block d-lg-none"
        src="assets/img/jumbotron_tablet.png"
      />
      <img class="d-xs-block d-md-none" src="assets/img/jumbotron_mobile.png" />
    </div>

    <div class="page--center">
      <router-view></router-view>
    </div>

    <div class="footer">
      <router-link class="footer-item" to="/">Mapa</router-link>
      <router-link class="footer-item" to="/profiles"
        >Profily vědců</router-link
      >
      <router-link class="footer-item" to="/calendar"
        >Kalendář akcí</router-link
      >
      <router-link class="footer-item" to="/about">O projektu</router-link>
      <p>Copyright ©2020 zavedou.cz</p>
      <a
        class="footer-item"
        href="http://www.freepik.com"
        target="_blank"
        rel="noopener noreferrer"
        >Illustrations by macrovector &#128151;</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  box-sizing: border-box;
}

body {
  font-family: "Roboto Slab";
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

body h1 {
  font-family: "Raleway";
  font-weight: 300;
}

body img {
  width: 100%;
}
.custom_pin {
  width: 40px;
}

.page--center {
  min-height: 90vh;
}

.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 10vh;
  flex-wrap: wrap;
}
.footer p {
  margin-bottom: 0;
  padding: 0 1rem;
}

.footer-item {
  padding: 0rem 1rem;
}

@media (max-width: 767.98px) {
  header {
    height: 8%;
  }
  header img {
    width: 13rem;
    padding: 0;
  }
  .footer {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 70%;
    height: 10vh;
    font-size: 0.8rem;
  }
  .page--center {
    width: 95%;
    margin: 0 auto;
  }
}

@media (max-width: 991.98px) and (min-width: 767.99px) {
  header {
    height: 12%;
  }
  header img {
    width: 13rem;
    padding: 0;
  }
  .footer {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 70%;
    height: 10vh;
    font-size: 0.8rem;
  }

  .page--center {
    width: 95%;
    margin: 0 auto;
  }
}

@media (min-width: 991.99px) {
  header {
    height: 12%;
  }
  header img {
    width: 13rem;
    padding: 0rem;
  }

  .footer {
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 70%;
    height: 10vh;
    font-size: 1rem;
  }

  .page--center {
    width: 70%;
    margin: 0 auto;
  }
}
</style>
