<template>
  <div>
    <div class="blog-card">
      <div class="meta">
        <div
          class="photo"
          :style="{ backgroundImage: 'url(' + link_picture + ')' }"
        ></div>
        <ul class="details">
          <li class="date">
            Od {{ start | moment("DD.MM.") }} do
            {{ end | moment("DD.MM.YYYY") }}
          </li>
          <li class="tags">
            <ul>
              <li>
                <a v-bind:href="link">Více informací</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="description">
        <h1>{{ name }}</h1>
        <h2>{{ town }}</h2>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Event",
  props: [
    "id",
    "name",
    "type",
    "description",
    "place",
    "town",
    "street",
    "descriptiveNumber",
    "orientationNumber",
    "townPart",
    "zipCode",
    "link",
    "link_picture",
    "child",
    "teenager",
    "adult",
    "start",
    "end",
    "note",
    "region",
  ],
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
body {
  background: white;
  margin: 2rem;
}
.blog-card {
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  box-shadow: 0 3px 7px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.6%;
  background: #84d3ef;
  line-height: 1.4;
  font-family: sans-serif;
  border-radius: 5px;
  overflow: hidden;
  z-index: 0;
}
.blog-card a {
  color: inherit;
}
.blog-card a:hover {
  color: #0aa2ff;
}
.blog-card:hover .photo {
  transform: scale(1.3) rotate(3deg);
}
.blog-card .meta {
  position: relative;
  z-index: 0;
  height: 200px;
}
.blog-card .photo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.2s;
}
.blog-card .details,
.blog-card .details ul {
  margin: auto;
  padding: 0;
  list-style: none;
}
.blog-card .details {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -100%;
  margin: auto;
  transition: left 0.2s;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 10px;
  width: 100%;
  font-size: 1.2rem;
}

.blog-card .details ul li {
  display: inline-block;
}
.blog-card .details .author:before {
  margin-right: 10px;
}
.blog-card .details .date:before {
  margin-right: 10px;
}
.blog-card .details .tags ul:before {
  margin-right: 10px;
}
.blog-card .details .tags li {
  margin-right: 2px;
}
.blog-card .details .tags li:first-child {
  margin-left: -4px;
}
.blog-card .description {
  padding: 1rem;
  background: #84d3ef;
  position: relative;
  z-index: 1;
}

.blog-card .description h1 {
  font-family: Raleway, sans-serif;
  line-height: 1;
  margin: 0;
  font-size: 1.7rem;
}
.blog-card .description h2 {
  font-family: Roboto Slab, sans-serif;
  font-weight: 400;
  font-size: 1rem;

  text-transform: uppercase;
  color: rgb(31, 30, 30);
  margin-top: 5px;
}
.blog-card .description .read-more {
  text-align: right;
}
.blog-card .description .read-more a {
  color: #0aa2ff;
  display: inline-block;
  position: relative;
}
.blog-card .description .read-more a:after {
  margin-left: -10px;
  opacity: 0;
  vertical-align: middle;
  transition: margin 0.3s, opacity 0.3s;
}
.blog-card .description .read-more a:hover:after {
  margin-left: 5px;
  opacity: 1;
}
.blog-card p {
  font-family: Roboto Slab, sans-serif;
  position: relative;
  margin: 1rem 0 0;
}
.blog-card p:first-of-type {
  margin-top: 1.25rem;
}
.blog-card p:first-of-type:before {
  content: "";
  position: absolute;
  height: 5px;
  background: #0aa2ff;
  width: 35px;
  top: -0.75rem;
  border-radius: 3px;
}
.blog-card:hover .details {
  left: 0%;
}
@media (min-width: 640px) {
  .blog-card {
    flex-direction: row;
    max-width: 700px;
    min-height: 200px;
  }
  .blog-card .meta {
    flex-basis: 40%;
    height: auto;
  }
  .blog-card .description {
    flex-basis: 60%;
  }
  .blog-card .description:before {
    transform: skewX(-3deg);
    content: "";
    background: #84d3ef;
    width: 30px;
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    z-index: -1;
  }
}
</style>
