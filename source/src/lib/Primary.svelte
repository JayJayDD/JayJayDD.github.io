<script>
    import { Dropdown } from "bootstrap/dist/js/bootstrap.bundle";
    import Preview from "./Preview.svelte";
    import ModCard from "./modCard.svelte";
    export let database;
    let result;
    //let rootDataBase = database
/*     let elementsPerRow = 4;
    let row = 12 / elementsPerRow; */
    export let count;
    export let tags;
    let queryName = "";
    let queryTags = "";
    let dropdown;
    let tagsList = tags;
    let databaseTagsTemp = [];
    let databaseSearchTemp = [];
    let previousQuery = "";
    let previousTagQuery = [];

    export let selectedTags = [];
    export let elementsPerPage = 12;
    export let page = 1;

    function filterArray(value){
        
    }

    function changePage(value){
        if (!(value < 1)&&!(value > Math.ceil(count/elementsPerPage))){
            page = value
        }
    }

    function queryTagList(){
        if (queryTags) {
            tagsList = tags.filter(t => t.startsWith(queryTags))
        }
        else {
            tagsList = tags
        }
    }

    function selectTag(value){
        page = 1;
        if (selectedTags.findIndex(e => e === value) == -1){
            selectedTags = selectedTags.concat(value);
        }
    }

    function clearTag(value){
        page = 1;
        selectedTags = selectedTags.filter(e => e != value);
    }

    function showDropdown(){
        queryTags = '';
        queryTagList();
        dropdown = document.getElementsByClassName("dropdown-menu")[0].style.display;
        dropdown = 'block';
    }

    function hideDropdown(){
        queryTags = '';
        queryTagList();
        dropdown = document.getElementsByClassName("dropdown-menu")[0].style.display;
        dropdown = 'none';
    }

    function clickOutside(node) {
        const handleClick = event => {
            if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('click_outside', node)
            )
            }
        }

        document.addEventListener('click', handleClick, true);
    
        return {
            destroy() {
            document.removeEventListener('click', handleClick, true);
            }
        }
    }


    function filterModsByTags(){ //could be slow
        let temp = []
        //console.log("filter: " + selectedTags);
        previousTagQuery = selectedTags;
/*         if (selectedTags.length === 0){
                database = rootDataBase
                database = database
        } */
            //database = rootDataBase
            //database = database
        for (let i = 0; i < database.length; i++){
            let cnt = 0
            if (database[i].tags != null){
                let tmpTags = database[i].tags.split(",")
                for (let x = 0; x < tmpTags.length; x++){
                    for (let st = 0; st < selectedTags.length; st++){
                        if (selectedTags[st] === tmpTags[x]){
                            cnt = cnt + 1
                        }
                    }
                }
            }
            database[i].cnt = cnt
        }
        for (let i = 0; i < database.length; i++){
        if (database[i].cnt == selectedTags.length){
            temp.push(database[i])
        }
        }

        if (queryName != "") {
            temp = temp.filter(arr => arr.mod_title.toLowerCase().indexOf(queryName.toLowerCase())!= -1)
            //console.log(database)
        }

        result = temp
        //databaseTagsTemp = temp
        //return temp
    }

    function filterModsByQuery(){
        //database = rootDataBase
        previousQuery = queryName
        if (queryName != "") {
            result = database.filter(arr => arr.mod_title.toLowerCase().indexOf(queryName.toLowerCase())!= -1)
            //databaseSearchTemp = database.filter(arr => arr.mod_title.toLowerCase().indexOf(queryName.toLowerCase())!= -1)
            //console.log(database)
        }
        else {
            result = database
        }
    }

    $: if (queryName || selectedTags){
        filterModsByTags()
        count = result.length
    }

/*     $: if (queryName.length != previousQuery.length) {
        console.log("Input")
        filterModsByQuery()
        count = database.length
    } 
    
    $: if (queryName.length === 0) {
        console.log("Reset to List: " + databaseTagsTemp)
        database = databaseTagsTemp
    }

    $: if (selectedTags.length != previousTagQuery.length) {
        filterModsByTags()
        count = database.length
    } 
    $: if (selectedTags.length === 0) {
        database = databaseSearchTemp
    } */

    $: if (selectedTags.length === 0 && queryName.length === 0){
        //console.log("Clear")
        result = database
    }
</script>
<div class="col-md-9 order-2 order-md-1 px-5 py-4 main">
    <div class="d-grid metaGrid">
        {#each result.slice((elementsPerPage * page) - elementsPerPage,elementsPerPage * page) as {mod_title, mod_creator, preview_imgs, mod_artist, song_artist, release_date, song_title, thumb_img, length, tags, folder, download_type, download_link}, i} 
            <ModCard bind:page={page} bind:selectedTags={selectedTags} mod_title={mod_title} mod_creator={mod_creator} preview_imgs={preview_imgs} mod_artist={mod_artist} song_artist={song_artist} release_date={release_date} song_title={song_title} thumb_img={thumb_img} length={length} tags={tags} folder={folder} download_type={download_type} download_link={download_link}/>
        {/each}          
    </div>
</div>
<div class="col-md-3 col-lg-3 col-xl-2 order-1 order-md-2 py-4 sticky-top filterBar">
    <div class="container">
        <div class="filterTopBar"><span>Filters</span></div>
            <span>Search:</span>
            <div class="input-group mb-2"> 
                <input class="form-control" bind:value={queryName} type="text" placeholder="Search by title" aria-label="Search by title">
            </div>
            <span>Tags:</span>
            <div class="input-group">            
                <input class="form-control" bind:value={queryTags} on:input={queryTagList} on:focus={showDropdown} use:clickOutside on:click_outside={hideDropdown} type="text" placeholder="Tags" aria-label="Search">
            </div>
            <ul id="dropdown-menu" class="dropdown-menu" style="display:{queryTags || dropdown == 'block' ? 'block' : 'none'}">
                {#each tagsList as x}
                    <li on:click={selectTag(x)} class="dropdown-item ">{x}</li>
                {/each}
            </ul>
            <div class="mt-3 tags d-flex">
                {#each selectedTags as y}
                    <span on:click={clearTag(y)} class="tagSearch badge tagsItem" id={y}>{y}</span>
                {/each}
            </div>
    </div>   
    <div class="col py-2">
        <nav>
          <ul class="pagination pagination justify-content-center">
            {#if page > 1}
                <li class="page-item"><span class="page-link noselect" on:click={() => changePage(page-1)}>Previous</span></li>
                <li class="page-item"><span class="page-link" on:click={() => changePage(1)}>{1}</span></li>
            {:else}
                <li class="page-item disabled"><span class="page-link noselect">Previous</span></li>
            {/if}
            {#each Array(Math.ceil(count/elementsPerPage)) as p, i}
            {#if page === i+1}
                <li class="page-item active"><span class="page-link">{i+1}</span></li>
            {/if}
            {#if Array(Math.ceil(count/elementsPerPage)).length-1 === i}
                {#if page > 1 && page != Math.ceil(count/elementsPerPage)}
                    <li class="page-item disabled"><span class="page-link" >...</span></li>
                {/if}
            {/if}
            {/each}
            {#if page != Math.ceil(count/elementsPerPage)}
                <li class="page-item"><span class="page-link" on:click={() => changePage(Math.ceil(count/elementsPerPage))}>{Math.ceil(count/elementsPerPage)}</span></li>
                <li class="page-item"><span class="page-link noselect" on:click={() => changePage(page+1)}>Next</span></li>
            {:else}
                <li class="page-item disabled"><span class="page-link noselect">Next</span></li>
            {/if}
          </ul>
        </nav>
    </div>
</div>