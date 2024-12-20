
// https://github.com/ProgrammingHero1/ph-tube-resources

// console.log('this is log')


const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))

}

function getTimeString(time){
    const hour = parseInt(time / 3600);
     let remainingSecond = time % 3600;
     const minute = parseInt(remainingSecond / 60)
     remainingSecond = remainingSecond % 60;
     return `${hour} hour ${minute} minute ${remainingSecond} second ago`
}

const  removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn')
    // console.log(buttons);
    for(let btn of buttons){
        btn.classList.remove('active');
    }

   };



const loadVideos = (searchText ='') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideo(data.videos))
        .catch(error => console.log(error))

}


const loadCategoryVideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {

            removeActiveClass()

            const activeBtn = document.getElementById(`btn-${id}`)
            // console.log(activeBtn)
            activeBtn.classList.add('active');
            displayVideo(data.category)
        })
        .catch(error => console.log(error))
}

const loadDetails = async (videoId) => {
     const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
     const res = await fetch(uri);
     const data = await res.json();
     displayDetails(data.video)

}

const displayDetails = (video) => {
    // console.log(video)
    const detailsContainer = document.getElementById('modal-content')

    detailsContainer.innerHTML = `
     <img src=${video.thumbnail} alt="">
    <p>${video.title}</p>
    `
    // document.getElementById('showModalData').click() /// away one
    document.getElementById('customModal').showModal() // away two

} 


const displayVideo = (videos) => {
    // console.log(videos)
    const videoContainer = document.getElementById("video");
    videoContainer.innerHTML = '';

    if(videos.length == 0 ){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
                <div class="min-h-[400px] flex flex col gap-5 justify-center items-center">
                  <img src="Icon.png" alt="">
                   <h2>No Content Here in this categoiry</h2>
                </div>
        `
        return;
    }

    else{
        videoContainer.classList.add('grid')
    }

    videos.forEach(video => {
        // console.log(video)
        const card = document.createElement('div');
        card.classList = 'card card-compact'
        card.innerHTML = `
             <figure class='h-[200px] relative'>
    <img class="h-full w-full object-cover"
      src="${video.thumbnail}"
        alt="Shoes" />
        ${
            video.others.posted_date?.length == 0 ? '' : `<span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white">
            ${getTimeString(video.others.posted_date)}
            </span>`
        }
       
  </figure>
  <div class="py-2 flex gap-2">
        <div>
            <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}" alt="">
        </div>
        <div>
            <h2>${video.title}</h2>
           <div class="flex item-center gap-2">
            <p>${video.authors[0].profile_name}</p>
            ${video.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=100&id=6xO3fnY41hu2&format=png&color=000000" alt="">` : ''}
            <p> <button onclick = "loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button></p>
            </div>
        </div>    
         </div>
        
        `
        videoContainer.append(card)
    })

}



const displayCategories = (categories) => {

    const categoryContainer = document.getElementById('category-container')

    categories.forEach((item) => {
        // console.log(item);

        const buttonContainer = document.createElement('div')
            buttonContainer.innerHTML = `
              <button  id='btn-${item.category_id}' onclick="loadCategoryVideo(${item.category_id})" class="btn category-btn">
              ${item.category}
              </button>
            `
        categoryContainer.append(buttonContainer)

    });

}

document.getElementById('search-input').addEventListener('keyup',(e)=>{
    loadVideos(e.target.value)
})


loadCategories()

loadVideos()

