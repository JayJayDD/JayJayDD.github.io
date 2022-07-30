<script>
    import Preview from "./Preview.svelte";
    export let mod_title
    export let mod_creator
    export let preview_imgs
    export let mod_artist
    export let song_artist
    export let release_date
    export let song_title
    export let thumb_img
    export let length
    export let tags
    export let folder
    export let download_type
    export let download_link
    export let selectedTags
    export let page

    async function fetchPreview(ref){
        const res = await fetch('/catalog/db.json')
        let text = await res.json()
    }

    function selectTag(value){
        page = 1
        if (selectedTags.findIndex(e => e === value) == -1){
            selectedTags = selectedTags.concat(value)
        }
    }

</script>

<div class="modCard"> 
    <div class="metaHeader">
        <div class="metaPreview img-fluid">
            <img alt="preview" loading=lazy class="metaPreview img-fluid" src={"mods/" + folder + "/anims/" + preview_imgs}> <!--TODO: realize src loading through promises pls-->
            <Preview imageSource={"mods/" + folder + "/anims/" + preview_imgs}/>
        </div>
    </div>
    <div class="metaContent p-2 row d-flex justify-content-between mx-auto">
        <div class="metaStatus text-wrap col-md-4">
            <span class="mx-2">{release_date}</span>
            <img class="svg-icons" alt="release date" src="assets/release.svg">
        </div>
        <div class="col-8 p-1">
            <div class="text-wrap metaTags">
                <div>
                    <img class="svg-icons" alt="mod title" src="assets/name.svg">
                    <span class="align-middle">{mod_title}</span>
                </div>
            </div>
            <div class="text-wrap metaTags">
                <div>
                    <img class="svg-icons" alt="mod creator" src="assets/creator.svg">
                    <span class="align-middle">{mod_creator}</span>
                </div>
            </div>
            <div class="text-wrap metaTags">
                <div>
                    <img class="svg-icons" alt="mod artist" src="assets/artist.svg">
                    <span class="align-middle">{mod_artist}</span>
                </div>
            </div>
            <div class="text-wrap metaTags">
                <div>
                    <img class="svg-icons" alt="song meta" src="assets/song.svg">
                    <span class="align-middle">{song_artist + " - " + song_title}</span>
                </div>
            </div>
            <div class="text-wrap metaTags">
                <img class="svg-icons" alt="mod length" src="assets/timelapse.svg">
                <span class="align-middle">{length.split(":")[0] + " Min " + length.split(":")[1] + " Secs"}</span>
            </div>
            
            <div class="text-wrap metaTags">
                <img class="svg-icons" alt="tags" src="assets/tag.svg">
                {#if (tags != null)}
                    {#each tags = tags.split(",") as f}
                        <span on:click={selectTag(f)} class="tagsItem badge">{f}</span>
                    {/each}
                {/if}
            </div>
            <div class="text-wrap metaDownload">
                {#if download_type}
                    <div>
                        <img class="svg-icons" alt="mod length" src="assets/download.svg">
                        <!--<span class="label">Download:</span>-->
                        <span class={"badge " + download_type + " align-middle"}>
                            <a href={download_link} target="_blank">{download_type}</a>
                        </span>
                    </div>
                {:else}
                    <div>
                        <img class="svg-icons" alt="mod length" src="assets/download.svg">
                        <!--<span class="label">Download:</span>-->
                        <span class={"badge " + "download_none"}>
                            N/A
                        </span>
                    </div>
                {/if}
            </div>
        </div>
        {#if thumb_img == null}
            <div class="col-4 mt-auto mb-auto thumb" style={"background-image: url('assets/nothumbnail.png');"}></div>
        {:else}
            <div class="col-4 mt-auto mb-auto thumb" style={"background-image: url('mods/" + folder + "/"+ thumb_img + "\');"}></div>
        {/if}
    </div>
</div>