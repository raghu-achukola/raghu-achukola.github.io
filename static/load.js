

function insertSectionHTML(html){
    console.log(html)
    let sectionElement = document.querySelector("#section-content");
    sectionElement.innerHTML = ""
    sectionElement.insertAdjacentHTML(
        "afterbegin",html
    )
}


async function get_page_html(location){
    const page_req = await fetch(location);
    const page_html = await page_req.text()
    return page_html
}

function mouseScroll(){
    const track = document.getElementById("project-track");
    // window.onmousedown = e => {
    //     track.dataset.mouseDownAt = e.clientX;
    // }
    // window.onmousemove = e => {
    //     const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    //         maxDelta = window.innerWidth/2;
    //     const percentage = (mouseDelta/maxDelta)*100;
    //     const width = (-percentage + 75)
    //     track.style.transform = `translate(${percentage}%,0%)`;
    //     track.style.width = `${width}%`
    // }

    
}
function loadPage(element){
    const page_location = `sections/${element.id.substring(8)}.html`;
    get_page_html(page_location).then(
        page_html => {
            insertSectionHTML(page_html);
            if (element.id.substring(8) == 'projects'){
                mouseScroll();
                set_arrow_nav();
            }
        });
}

function set_arrow_nav(){

    
    const track = document.getElementById("project-track");

    function checkKey(e) {

        const projectList = document.querySelectorAll('#project-track.project-img.active')

        if (e.keyCode == '37') {
        // left arrow
            console.log('LEFT')
            
            move_track(track,-1)
        }
        else if (e.keyCode == '39') {
        // right arrow
            console.log('RIGHT')
            move_track(track,1)
        }

    }
    document.onkeydown = checkKey;
}

function move_track(track, distance){
    let imgs = track.getElementsByClassName('project-img');
    console.log(imgs)
    let activeIndex = 0;
    const minIndex = 0;
    const maxIndex = imgs.length -1
    for (let i = 0; i < imgs.length; i++) {
        console.log(imgs[i])
        if (imgs[i].classList.contains('active')){
            activeIndex = i;
            console.log(activeIndex)
            let newIndex = Math.max(Math.min(activeIndex+distance,maxIndex),minIndex);
            actualDistance = newIndex-activeIndex
            console.log(`New index: ${newIndex}`)
            imgs[newIndex].classList.add('active')
            imgs[activeIndex].classList.remove('active')
            track.style.left = `${25-newIndex*50}%`
            track.style.width = `${75 + newIndex*50}%`
            break;
        }
    }

}