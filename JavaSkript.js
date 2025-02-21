async function request() {
    try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await fetch("https://api.tvmaze.com/shows")
        if (!response.ok) {
            throw "ERROR !!!!"
        }
        const data = await response.json()
        console.log(data);
        displayInformation(data)
        searchInput(data)
        displayKholase(data)

        // for (const Ob of data.slice(12, 24)) {
        //     const response2 = await fetch(`https://api.tvmaze.com/shows/${Ob.id}/episodes`)
        //     const data2 = await response2.json()
        //     console.log(data2);
        // }

    } catch (error) {
        console.error(error);
    }
}
request()

function displayInformation(data) {
    const container_movie = document.getElementById("container_movie")

    let htmlContent = ""
    data.slice(50, 62).forEach(Ob => {
        htmlContent += `
        <div class="section_card" data-id="${Ob.id}">
        <div class="p_card">
        <img src="${Ob.image.medium}" alt="${Ob.name}">
        <div class="p_text_card">
        <h2 class="name_movie">${Ob.name}</h2>
        <p class="Genre_movie">${Ob.genres}</p>
        <p class="score_movie">${Ob.rating.average}</p>
        </div>
        </div>
        <div class="summary-box"></div>
        </div>
        `
    });
    container_movie.innerHTML = htmlContent



    const cards = document.querySelectorAll(".section_card")
    const img1 = document.querySelector(".img1")
    const titre_1 = document.querySelector(".titre_1")

    cards.forEach(card => {
        card.addEventListener("click", async function () {


            img1.style.display = "none"
            titre_1.style.display = "none"
            container_movie.style.display = "none"
            const ID = this.getAttribute("data-id");
            console.log(ID);
            await requestEpisodes(ID)
        })
    });
}










async function requestEpisodes(ID) {
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));


        const response2 = await fetch(`https://api.tvmaze.com/shows/${ID}/episodes`)
        if (!response2.ok) {
            throw "ERROR !!!!!"
        }

        const episodes = await response2.json()
        console.log(episodes);
        displayEpisodes(episodes)

    } catch (error) {
        console.error(error);
    }
}






const selected = document.querySelector("#Drop-down-list");

selected.addEventListener("change", () => {
    const selected_value = selected.value;


    const resultFiltering = episodes.filter((episode) => {
        return `S${episode.season}-E${episode.number}` === selected_value;
    });

    displayEpisodes(resultFiltering);
});


function displayEpisodes(episodes) {
    const container_movie = document.getElementById("container_movie");
    const header = document.querySelector("#header");
    const p_search = document.querySelector(".p_search");

    htmlContent = "";
    htmlContent2 = "";
    episodes.slice(0, 28).forEach(Ob => {
        htmlContent += `
        <div class="section_card" data-id="${Ob.id}">
            <div class="p_card2">
                <div class="p_img_card2">
                    <img src="${Ob.image.medium}" alt="${Ob.name}" class="img_card2">
                </div>
                <div class="p_text_card2">
                    <div><h4 class="name_movie2" style="color: white">S${Ob.season}-E${Ob.number} ${Ob.name}</h4></div>
                </div>
                <div class="parent_iconPlay_episodes">
                    <div class="ch_parent_iconPlay_episodes">
                    <a href="${Ob.url}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="20" fill="currentColor">
                            <path d="M64.7 52.7c-9.9-6-22.2-6.3-32.3-.6S16 68.4 16 80l0 352c0 11.6 6.3 22.2 16.3 27.9s22.5 5.4 32.3-.6l288-176c9.5-5.8 15.3-16.2 15.3-27.3s-5.8-21.5-15.3-27.3l-288-176z"/>
                        </svg>
                        </a>
                    </div>
                </div>
                <div class="kholase1"><p>${Ob.summary.slice(0, 120)} ...</p></div>
            </div>
        </div>
        `;

        htmlContent2 += `<option value="S${Ob.season}-E${Ob.number}">S${Ob.season}-E${Ob.number} ${Ob.name}</option>`;
        p_search.innerHTML = `
            <select id="Drop-down-list" class="Drop-down-list">
                <option value="">All Episodes</option>
                ${htmlContent2}
            </select>
        `


    });


    container_movie.innerHTML = htmlContent;
    container_movie.style.display = "flex";

    const cards = document.querySelectorAll(".section_card");
    cards.forEach((card) => {
        const kholase1 = card.querySelector(".kholase1");
        kholase1.style.display = "none";

        card.addEventListener("mouseenter", () => {
            kholase1.style.display = "block";
        });
        card.addEventListener("mouseleave", () => {
            kholase1.style.display = "none";
        });
    });
}





































https://api.tvmaze.com/shows/${Ob.id}/episodes

// -----------------------------------------------------

function searchInput(data) {
    const input = document.querySelector("input")

    input.addEventListener("input", (e) => {
        console.log(input.value);
        const searchValue = input.value.toUpperCase().trim()

        const resultFiltering = data.filter((Ob) => {
            return Ob.name.toUpperCase().trim().includes(searchValue)
        })
        displayInformation(resultFiltering)
    })

}