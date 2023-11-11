
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
    // console.log(html)
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
                mouseScroll();
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
            imgs[activeIndex].classList.remove('active')
            imgs[newIndex].classList.add('active')
            track.style.left = `${25-newIndex*50}%`
            track.style.width = `${75 + newIndex*50}%`
            break;
        }
    }

}


function loadImg(element){
    const PIC_FRAME = document.getElementById( "introduction-profile-picture" )
    const newImgSrc = element.getAttribute("loadimg")
    PIC_FRAME.src = newImgSrc
}

function resetImg(){
    // const PIC_FRAME = document.getElementById( "introduction-profile-picture" )
    // PIC_FRAME.src = PIC_FRAME.getAttribute("defaultSrc")
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
    // element.src="img/hat_colored.svg"
}


function toggleNav(){

    const navigator = document.getElementById('scroll-navigator');
    const sections = document.querySelectorAll('section');
    console.log(sections)
    // function scrollToSection(index) {
    //     const targetSection = sections[index];
    //     targetSection.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    //   }
    navigator.innerHTML = '';
    if (sections.length == 0){ navigator.classList.add('hidden'); return;}
    navigator.classList.remove('hidden')
    sections.forEach((section, index) => {
      const circle = document.createElement('div');
      console.log(section.id)
      circle.classList.add('nav-circle');
    // //   circle.href = `#${section.id}`
    //   console.log('2')
    //   console.log(`Section ${section.id}`)
      circle.addEventListener('click', () => {
        console.log(index);
        section.scrollIntoView({ block: 'end',  behavior: 'smooth' })
        console.log(sections)
      });
      navigator.delete
      navigator.appendChild(circle);
    });
  

  
    // Optionally, update the navigator circles based on scroll position
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
  
      sections.forEach((section, index) => {
        if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          highlightCircle(index);
        }
      });
    });
  
    function highlightCircle(index) {
      const circles = navigator.getElementsByClassName('nav-circle');
      for (let i = 0; i < circles.length; i++) {
        circles[i].style.backgroundColor = i === index ? '#e74c3c' : '#3498db';
      }
    }
}
  