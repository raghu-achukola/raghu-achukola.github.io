
function loadIntersectionObserver(){
    const hiddenElements = document.querySelectorAll('.animated-page')
    const options = {
        root: document.querySelector('#right-section')
    }
    const observer = new IntersectionObserver(
        (entries)=> {
            
            console.log('Intersection:', entries);
            entries.forEach(
                (entry) => {
                    console.log(entry)
                    if (entry.isIntersecting){
                        console.log('INTERSECT')
                        entry.target.classList.add('on-screen')
                        // entry.target.classList.remove('off-screen')
                    }
                    else{
                        entry.target.classList.remove('on-screen')
                        // entry.target.classList.add('off-screen')
                    }
                }
            )
        }
    )
    console.log(observer)
    hiddenElements.forEach((el) => observer.observe(el))
}


function insertSectionHTML(html){
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


function handleOverflow(hide){
    const rightSection = document.getElementById('right-column');
    rightSection.style.zIndex =  hide? -1 : 1;
}

function loadPage(element){
    const page_location = `sections/${element.id.substring(8)}.html`;
    get_page_html(page_location).then(
        page_html => {
            insertSectionHTML(page_html);
            if (element.id.substring(8) == 'projects'){
                handleOverflow(true);
                set_arrow_nav();
            }
            else if (element.id.substring(8) == 'about_me'){
                loadIntersectionObserver();
            }
            else{
                handleOverflow(false)
            }
            toggleNav();
        });
}

function set_arrow_nav(){
    const track = document.getElementById("project-track");
    function checkKey(e) {
        if (e.keyCode == '37') {
        // left arrow
            console.log('LEFT');
            move_track(track,-1);
        }
        else if (e.keyCode == '39') {
        // right arrow
            console.log('RIGHT');
            move_track(track,1);
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
            imgs[activeIndex].classList.remove('active')
            imgs[newIndex].classList.add('active')
            track.style.setProperty('--current-selected',newIndex)

            break;
        }
    }

}

function loadImg(element){
    const PIC_FRAME = document.getElementById( "introduction-profile-picture" )
    const newImgSrc = element.getAttribute("loadimg")
    PIC_FRAME.src = newImgSrc
}

function hat(element){
    console.log('a')
    const hats = document.getElementById('hats').getElementsByTagName('*')
    const currentDisplay = document.querySelector('.resume-section.disp')
    console.log(currentDisplay)
    for (let index = 0; index < hats.length; index++) {
        let ell = hats[index];
        ell.classList.remove('selected')
    }
    element.classList.add('selected')
    let displayTarget = document.getElementById(element.dataset.target);
    
    console.log(displayTarget)
    currentDisplay.classList.remove('disp')
    displayTarget.classList.add('disp')
}


function toggleNav(){
    const navigator = document.getElementById('scroll-navigator');
    const nc = document.querySelector('.navsec-container')
    const sections = document.querySelectorAll('section');
    navigator.innerHTML = '';
    if (sections.length == 0){ navigator.classList.add('hidden'); console.log('NAVIGATOR CLASSLIST HIDDEN');return;}
    navigator.classList.remove('hidden')
    let switches = [-200]
    sections.forEach((section, index) => {
      if (switches.length == 1) { switches.push(section.offsetHeight*2/3)}
      else{ switches.push(switches[switches.length-1]+section.offsetHeight)}
      const circle = document.createElement('div');
      circle.classList.add('nav-circle');
      circle.addEventListener('click', () => {
        section.scrollIntoView({ block: 'end',  behavior: 'smooth' })
      });
      navigator.appendChild(circle);
    });
    

    nc.addEventListener('scroll', function(event) {
        sections.forEach( section => {
            
            const scrollPosition = nc.scrollTop;
            for (let i = 0; i < switches.length-1; i++) {
                if (scrollPosition > switches[i] && scrollPosition < switches[i+1]){
                    highlightCircle(i,true)
                }
                else{
                    highlightCircle(i,false)
                }
            }
    
        }
        )
    });
  
    function highlightCircle(index, selected) {
      const circles = navigator.getElementsByClassName('nav-circle');
      if (selected) {circles[index].classList.add('nav-selected')}
      else{circles[index].classList.remove('nav-selected')}
    }
}
  