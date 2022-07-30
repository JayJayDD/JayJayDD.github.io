<script>
    import {onMount} from 'svelte';
    export let src;
    export let cls;
    export let alt;

    let loaded = false;
    let failed = false;
    let loading = false;

    $: loading

    function pageChange(src){
        return {
            update(src){
                    const img = new Image();
                    img.src = src;
                    loading = true;
                    loaded = false;

                    img.onload = () => {
                            loading = false;
                            loaded = true;
                    };
                    img.onerror = () => {
                            loading = false;
                            failed = true;
                    };
            }
        }
    }

    onMount(() => {
			const img = new Image();
			img.src = src;
			loading = true;

			img.onload = () => {
					loading = false;
					loaded = true;
                    //console.log("done")
			};
			img.onerror = () => {
					loading = false;
					failed = true;
			};
	})

</script>

{#if loaded}
    <img use:pageChange={src} class={cls} {alt} {src}/>
{:else if loading}
    <div class="spinner row my-4 m-4" style="height: auto;" >
        <div class="spinner-border mx-auto" role="status">
        <span class="visually-hidden">Fetching...</span>
        </div>
    </div>
{/if}