<script>
  import Primary from './lib/Primary.svelte'
  import css from '../node_modules/bootstrap/dist/css/bootstrap.css'
  import css2 from './stylesheet.css'
  import * as popperbs from '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
  //import database from "./db.json"

  let count = 0
  let selectedTags = []
  let tags = [];
  let filter = [];
  //let data = structuredClone(database.sort())
  let data = {}

  async function getDatabase(filter){
    const res = await fetch('/catalog/db.json')
    let text = await res.json()

    if (res.ok) {
      //data = structuredClone(text)
      getTags(structuredClone(text))
      count = structuredClone(text).length
      return structuredClone(text);
    } else {
      throw new Error(text);
    }
  }

  function getTags(database){//could be slow needs await
        let tmp
        for (let x of database){
          if (x.tags != null){
            tmp = x.tags.split(",")
              for (let j of tmp)
                  if (tags.indexOf(j) === -1){
                      tags.push(j)
                  }
            }
          }
          tags.sort()
    }

    $: count = data.length

</script>

<header>
</header>
<div>
  <div class="headerWrapper">
    <div class="header mx-4 py-4 px-5">
      <a href="./">
        <img class="col" alt="logo" src="assets/logo.png">
        <h1 class="d-inline align-middle col-auto text-left">Beat Banger 1.x Mods Catalogue</h1>
      </a>
      <figure>
        <blockquote class="blockquote">
          <p>A comprehensive list of every BB 1.x mod</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          <cite>Code: DoodleSurface</cite>
          <cite>S-tier Tags: Qwags</cite>
        </figcaption>
      </figure>
      <figure>
        <figcaption class="blockquote-footer">
          <cite>Number of Entries: {count}</cite>
        </figcaption>
        <figcaption class="blockquote-footer">
          <img class="shield" src="https://img.shields.io/github/last-commit/JayJayDD/JayJayDD.github.io?color=%230b132b&label=latest%20update&style=flat-square">
        </figcaption>
      </figure>
    </div>
  </div>
  <div class="mx-auto row primary">
    {#await getDatabase()}
      <div class="mx-auto row primary">
        <div class="spinner row my-4 m-4">
          <div class="spinner-border mx-auto" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    {:then data}
      <Primary selectedTags={selectedTags} count={count} database={data} tags={tags} />
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </div>
</div>