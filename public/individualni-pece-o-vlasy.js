let currentPage = window.location.pathname.split("/").pop();


if(currentPage === "individualni-pece-o-vlasy.html"){
    buttonTestStart = document.querySelectorAll(".test_button");
    buttonTestExit = document.querySelector(".exit_button");
    testMenu = document.querySelector(".test_haircare");
    stepOneChoices = document.querySelectorAll(".step_1 a");
    stepTwoChoices = document.querySelectorAll(".step_2 a");
    stepThreeChoices = document.querySelectorAll(".step_3 a");
    stepFourChoices = document.querySelectorAll(".step_4 a");
    stepFiveChoices = document.querySelectorAll(".step_5 a");
    stepSixChoices = document.querySelectorAll(".step_6 a");
    choices = [];
    let width = 0;

    buttonTestStart.forEach((button) => {
        button.addEventListener("click", function(e){
            e.preventDefault();
            document.querySelector(".test_haircare").style.display = "block";
            setTimeout(() => {
                document.querySelector(".test_haircare").style.opacity = "1";
            }, 50)
        })
    })

    buttonTestExit.addEventListener("click", () => {
        testMenu.style.opacity = "0";
            setTimeout(() => {
                testMenu.style.display = "none";
            }, 400)
    });

    function logWindowWidth() {
        width = window.innerWidth;
        let steps = document.querySelectorAll(".test_haircare .h-full");
        if(width > 1024){
            steps.forEach((step) => {
                if(step.style.display === "block"){
                    step.style.display = "flex";
                }
            })
        } else {
            steps.forEach((step) => {
                if(step.style.display === "flex"){
                    step.style.display = "block";
                }
            })
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        logWindowWidth();
    });

    window.addEventListener('resize', function() {
        logWindowWidth();
    });

    stepOneChoices.forEach((choice) => {
        choice.addEventListener("click", function(){
            choices.push(choice.innerText);
                if (width > 1024) {
                    document.querySelector(".step_2").style.display = "flex";
                } else {
                    document.querySelector(".step_2").style.display = "block";
                }
            setTimeout(() => {
                document.querySelector(".step_2").style.opacity = "1";
                document.querySelector(".step_1").style.opacity = "0";
            }, 50),
            setTimeout(() => {
                document.querySelector(".step_1").style.display = "none";
            })
        })
    })

    stepTwoChoices.forEach((choice) => {
        choice.addEventListener("click", function(){
            choices.push(choice.innerText);
            if (width > 1024){
                document.querySelector(".step_3").style.display = "flex";
            } else {
                document.querySelector(".step_3").style.display = "block";
            }
            setTimeout(() => {
                document.querySelector(".step_3").style.opacity = "1";
                document.querySelector(".step_2").style.opacity = "0";
            }, 50),
            setTimeout(() => {
                document.querySelector(".step_2").style.display = "none";
            })
        })
    })

    stepThreeChoices.forEach((choice) => {
        choice.addEventListener("click", function(){
            choices.push(choice.innerText);
            if (width > 1024){
                document.querySelector(".step_4").style.display = "flex";
            } else {
                document.querySelector(".step_4").style.display = "block";
            }
            setTimeout(() => {
                document.querySelector(".step_4").style.opacity = "1";
                document.querySelector(".step_3").style.opacity = "0";
            }, 50),
            setTimeout(() => {
                document.querySelector(".step_3").style.display = "none";
            })
        })
    })

    stepFourChoices.forEach((choice) => {
        choice.addEventListener("click", function(){
            choices.push(choice.innerText);
            if (width > 1024){
                document.querySelector(".step_5").style.display = "flex";
            } else {
                document.querySelector(".step_5").style.display = "block";
            }
            if(choice.innerText === "Žádný problém / zdravá údržba vlasů"){
                const options = document.querySelectorAll(".step_5 li");
                options.forEach((option) => {
                    option.style.display = "none";
                  });
                options[0].style.display = "inline-block";
            }else if(choice.innerText === "Suché a poškozené vlasy"){
                const options = document.querySelectorAll(".step_5 li");
                options.forEach((option) => {
                   option.style.display = "flex";
                  });
                options[0].style.display = "none";
            }
            setTimeout(() => {
                document.querySelector(".step_5").style.opacity = "1";
                document.querySelector(".step_4").style.opacity = "0";
            }, 50),
            setTimeout(() => {
                document.querySelector(".step_4").style.display = "none";
            })
        })
    })

    stepFiveChoices.forEach((choice) => {
        choice.addEventListener("click", function(){
            choices.push(choice.innerText);
            if (width > 1024){
                document.querySelector(".step_6").style.display = "flex";
            } else {
                document.querySelector(".step_6").style.display = "block";
            }
            setTimeout(() => {
                document.querySelector(".step_6").style.opacity = "1";
                document.querySelector(".step_5").style.opacity = "0";
            }, 50),
            setTimeout(() => {
                document.querySelector(".step_5").style.display = "none";
            })
        })
    })

    stepSixChoices.forEach((choice) => {
        choice.addEventListener("click", function(){
            choices.push(choice.innerText);
            localStorage.setItem("myData", JSON.stringify(choices));
            setTimeout(() => {
                window.location.href = "konzultace.html";
            }, 400)
        })
    })
    const options = document.querySelectorAll(".step_5 li");
                options.forEach((option) => {
                    option.style.display = "flex";
                  });
} else if(currentPage === "konzultace"){

    no1 = document.querySelector(".carousel_no1");
    no2 = document.querySelector(".carousel_no2");
    no3 = document.querySelector(".carousel_no3");
    no4 = document.querySelector(".carousel_no4");
    no5 = document.querySelector(".carousel_no5");
    let storedData = localStorage.getItem("myData");
    let choices = JSON.parse(storedData);
    let noOneList = [];
    let noTwoList = [];
    let noThreeList = [];
    let noFourList = [];
    let noFiveList = [];
    const buttonMobile = `<button class="w-3 h-3 transition-opacity bg-teal-900 rounded-full"></button>`;



     ////// SHAMPOO ///////

        honeyOatShampoo = `<div
    class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
    <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900"
        style="background: #B8DED7">Zdravé Vlasy & Pokožka</span>
    <div class="mt-5 lg:mt-8 xl:mt-10">
        <a href="produkty/honey-oat-hydratacni-sampon">
            <img alt="" class="w-full aspect-square"
                src="https://d3tlyp20mcsecl.cloudfront.net/media-library/779/conversions/lclhs0300-bg-putty.jpg"
                width="1920" height="1920">
    
        </a>
        <div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
            <a href="produkty/honey-oat-hydratacni-sampon"
                class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
                Honey &amp; Oat Hydratační Šampón
            </a>
            <p class="text-lg leading-[23px] mt-6">Dokonalá rovnováha vlhkosti a
            s manukovým medem a výtažky z mořských živočichů pro dokonalou hydrataci pokožky.
            pro udržení zdravých vlasů.</p>
            <a href="produkty/honey-oat-hydratacni-sampon"
                class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
            </a>
        </div>
    </div>
    </div>`;

        honeyOatLemongrassShampoo = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #B8DED7">Zdravé Vlasy &amp; Pokožka</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/organic-lemongrass-hydratacni-sampon">
<img alt="" class="w-full aspect-square" src="https://d3tlyp20mcsecl.cloudfront.net/media-library/782/conversions/lclls0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/organic-lemongrass-hydratacni-sampon" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Organic Lemongrass Hydratační Šampón
</a>
                <p class="text-lg leading-[23px] mt-6">Hydratujte a posilujte vlasy pomocí organických* olejů z citronové trávy a jojoby pro hydratované, hedvábně jemné vlasy.</p>
                <a href="produkty/organic-lemongrass-hydratacni-sampon" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
</a>
</div>
</div>                
</div>`;
    
        organicVolumisingShampoo = `<div
    class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
    <span class="px-6 py-3 text-lg leading-6 font-semimedium text-white"
        style="background: #982F47">Objem & Posílení Vlasů</span>
    <div class="mt-5 lg:mt-8 xl:mt-10">
        <a
            href="produkty/organic-orange-blossom-objemovy-sampon">
            <img alt="" class="w-full aspect-square"
                src="https://d3tlyp20mcsecl.cloudfront.net/media-library/840/conversions/lclos0300-bg-putty.jpg"
                width="1920" height="1920">
    
        </a>
        <div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
            <a href="produkty/organic-orange-blossom-objemovy-sampon"
                class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
                Organic Orange Blossom Objemový Šampón
            </a>
            <p class="text-lg leading-[23px] mt-6">Oživte tělo a odrazte se s naším
            Revitaboost Technology pro lesklé vlasy plné života.</p>
            <a href="produkty/organic-orange-blossom-objemovy-sampon"
                class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
            </a>
        </div>
    </div>
    </div>`;
    
        amarathThickeningShampoo = `<div
    class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
    <span class="px-6 py-3 text-lg leading-6 font-semimedium text-white"
        style="background: #982F47">Objem & Posílení Vlasů</span>
    <div class="mt-5 lg:mt-8 xl:mt-10">
        <a href="produkty/amaranth-posilujici-sampon">
            <img alt="" class="w-full aspect-square"
                src="https://d3tlyp20mcsecl.cloudfront.net/media-library/837/conversions/lclts0300-bg-putty.jpg"
                width="1920" height="1920">
    
        </a>
        <div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
            <a href="produkty/amaranth-posilujici-sampon"
                class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
                Amaranth Posilující Šampón
            </a>
            <p class="text-lg leading-[23px] mt-6">Zahuštění vlasů do nového rozměru s
            Revitaboost Technology pro plnější a silnější vlasy.</p>
            <a href="produkty/amaranth-posilujici-sampon"
                class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
            </a>
        </div>
    </div>
    </div>`;
    
        colourCareShampoo = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
    <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #F0DADC">Colour Care</span>
    <div class="mt-5 lg:mt-8 xl:mt-10">
    <a href="produkty/cool-blonde-tonovaci-sampon">
    <img alt="" class="w-full aspect-square" src="https://d3tlyp20mcsecl.cloudfront.net/media-library/815/conversions/lclcb0300-bg-putty.jpg" width="1920" height="1920">
    
    </a>
    <div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
    <a href="produkty/cool-blonde-tonovaci-sampon" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Blonde Tónovací Šampón
    </a>
            <p class="text-lg leading-[23px] mt-6">Eliminuje mosazné a žluté tóny a zároveň obnovuje vlhkost pro dlouhotrvající udržení barvy.</p>
            <a href="produkty/cool-blonde-tonovaci-sampon" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
    </a>
    </div>
    </div>                
    </div>`;

        royalAntiFrizzShampoo = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #A292B4">Curl Control &amp; Smooth</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/royal-yuzu-anti-frizz-sampon">
<img alt="" class="w-full aspect-square" src="https://d3tlyp20mcsecl.cloudfront.net/media-library/827/conversions/lclas0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/royal-yuzu-anti-frizz-sampon" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Royal Yuzu Anti-Frizz Šampón
</a>
                <p class="text-lg leading-[23px] mt-6">Vyhlaďte a zkroťte krepatění vlasů pomocí naší biopolymerové technologie pro hedvábné a poddajné vlasy.
</p>
                <a href="produkty/royal-yuzu-anti-frizz-sampon" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
</a>
</div>
</div>                </div>`;

        coolBlondeShampoo = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #F0DADC">Colour Care</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/cool-blonde-tonovaci-sampon">
<img alt="" class="w-full aspect-square" src="https://d3tlyp20mcsecl.cloudfront.net/media-library/815/conversions/lclcb0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/cool-blonde-tonovaci-sampon" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Blonde Tónovací Šampón
</a>
                <p class="text-lg leading-[23px] mt-6">Eliminuje mosazné a žluté tóny a zároveň obnovuje vlhkost pro dlouhotrvající udržení barvy.</p>
                <a href="produkty/cool-blonde-tonovaci-sampon" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
</a>
</div>
</div>                </div>`;

        mplexRepairingShampoo = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #A8BDD8">Suché  &amp; Poškozené Vlasy</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/m-plex-bond-repairing-sampon">
<img alt="" class="w-full aspect-square" src="https://d3tlyp20mcsecl.cloudfront.net/media-library/797/conversions/lclms0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/m-plex-bond-repairing-sampon" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    M-Plex Bond Repairing Šampón
</a>
                <p class="text-lg leading-[23px] mt-6">Obnovuje a chrání vlasové vazby díky technologii M-Plex Bond pro silnější a hladší vlasy.</p>
                <a href="produkty/m-plex-bond-repairing-sampon" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
</a>
</div>
</div>                </div>`;

        diamondDustShampoo = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #A8BDD8">Suché  &amp; Poškozené Vlasy</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/diamond-dust-vyzivujici-sampon">
<img alt="" class="w-full aspect-square" src="https://d3tlyp20mcsecl.cloudfront.net/media-library/794/conversions/lcldc0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/diamond-dust-vyzivujici-sampon" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Diamond Dust Vyživující Šampón
</a>
                <p class="text-lg leading-[23px] mt-6">Hydratujte a proměňte vlasy pomocí skutečných mikrojemných diamantů pro optimální sílu a intenzivní lesk.</p>
                <a href="produkty/diamond-dust-vyzivujici-sampon" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
</a>
</div>
</div>                </div>`;

        pureBotanicalShampoo = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #A8BDD8">Suché  &amp; Poškozené Vlasy</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/pure-botanical-vyzivujici-sampon">
<img alt="" class="w-full aspect-square" src="https://d3tlyp20mcsecl.cloudfront.net/media-library/799/conversions/lclns0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/pure-botanical-vyzivujici-sampon" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Pure Botanical Vyživující Šampón
</a>
                <p class="text-lg leading-[23px] mt-6">Prémiové rostlinné složení se směsí čistých ingrediencí pro hloubkovou výživu, péči o pokožku hlavy a její posílení.</p>
                <a href="produkty/pure-botanical-vyzivujici-sampon" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
</a>
</div>
</div>                </div>`;

    ////// CONDITIONER ///////

        vibrantColourConditioner = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #F0DADC">Colour Care</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/vibrant-rose-kondicioner-pro-peci-o-barvu">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/824/conversions/lcocc0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/vibrant-rose-kondicioner-pro-peci-o-barvu" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Vibrant Rose Pro Péči O Barvu
</a>
                <p class="text-lg leading-[23px] mt-6">Vylepšete a chraňte vitalitu barvy pomocí naší technologie Supreme Colour Blast pro zářivé barvy se zářivým leskem.</p>
                <a href="produkty/vibrant-rose-kondicioner-pro-peci-o-barvu" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
</a>
</div>
</div>                
</div>`;

        royalAntiFrizzConditioner = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #A292B4">Curl Control &amp; Smooth</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/royal-yuzu-anti-frizz-sampon">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/830/conversions/lcoac0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/royal-yuzu-anti-frizz-sampon" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Royal Yuzu Anti-Frizz Kondicionér
</a>
                <p class="text-lg leading-[23px] mt-6">Vyhlaďte a zkroťte krepatění vlasů pomocí naší biopolymerové technologie pro hedvábné a poddajné vlasy.</p>
                <a href="produkty/royal-yuzu-anti-frizz-sampon" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
</a>
</div>
</div>                
</div>`;

        coolBlondeConditioner = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #F0DADC">Colour Care</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/cool-blonde-tonovaci-kondicioner">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/1005/conversions/lcocb0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/cool-blonde-tonovaci-kondicioner" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Cool Blonde Tónovací Kondicionér
</a>
                <p class="text-lg leading-[23px] mt-6">Eliminuje mosazné a žluté tóny a zároveň obnovuje vlhkost pro dlouhotrvající udržení barvy.</p>
                <a href="produkty/cool-blonde-tonovaci-kondicioner" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
</a>
</div>
</div>                </div>`;

        honeyOatConditioner = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #B8DED7">Zdravé Vlasy &amp; Pokožka</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/honey-oat-hydratacni-kondicioner">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/785/conversions/lcohc0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/honey-oat-hydratacni-kondicioner" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Honey &amp; Oat Hydratační Kondicionér
</a>
                <p class="text-lg leading-[23px] mt-6">Dokonalá rovnováha hydratace a síly s manukovým medem a mořskými výtažky pro dokonalou péči o zdravé vlasy.</p>
                <a href="produkty/honey-oat-hydratacni-kondicioner" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
</a>
</div>
</div>                </div>`;

        diamondDustConditioner = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #A8BDD8">Suché  &amp; Poškozené Vlasy</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/diamond-dust-vyzivujici-sampon">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/802/conversions/lcodc0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/diamond-dust-vyzivujici-sampon" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Diamond Dust Vyživující Šampón
</a>
                <p class="text-lg leading-[23px] mt-6">Hydratujte a proměňte vlasy pomocí skutečných mikrojemných diamantů pro optimální sílu a intenzivní lesk.</p>
                <a href="produkty/diamond-dust-vyzivujici-sampon" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
</a>
</div>
</div>                </div>`;

        organicLemongrassConditioner = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #B8DED7">Zdravé Vlasy &amp; Pokožka</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/organic-lemongrass-hydratacni-kondicioner">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/788/conversions/lcolc0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/organic-lemongrass-hydratacni-kondicioner" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Organic Lemongrass Hydratační Kondicionér
</a>
                <p class="text-lg leading-[23px] mt-6">Hydratujte a posilujte vlasy pomocí organických* olejů z citronové trávy a jojoby pro hydratované, hedvábně jemné vlasy.
</p>
                <a href="produkty/organic-lemongrass-hydratacni-kondicioner" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
</a>
</div>
</div>                </div>`;

        organicBlossomConditioner = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-white" style="background: #982F47">Objem &amp; Posílení Vlasů </span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/organic-orange-blossom-objemovy-sampon">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/846/conversions/lcooc0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/organic-orange-blossom-objemovy-sampon" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Organic Orange Blossom Objemový Šampón
</a>
                <p class="text-lg leading-[23px] mt-6">Díky naší technologii Revitaboost získáte lesklé vlasy plné života.</p>
                <a href="produkty/organic-orange-blossom-objemovy-sampon" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        amarathThickeningConditioner = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-white" style="background: #982F47">Objem &amp; Posílení Vlasů </span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/amaranth-posilujici-kondicioner">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/843/conversions/lcotc0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/amaranth-posilujici-kondicioner" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Amaranth Posilující Kondicionér
</a>
                <p class="text-lg leading-[23px] mt-6">Zahustěte vlasy do nové dimenze díky naší inovativní technologii Revitaboost pro plnější a silnější vlasy.</p>
                <a href="produkty/amaranth-posilujici-kondicioner" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        pureBotanicalConditioner = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #A8BDD8">Suché  &amp; Poškozené Vlasy</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/pure-botanical-vyzivujici-kondicioner">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/807/conversions/lconc0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/pure-botanical-vyzivujici-kondicioner" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Pure Botanical Vyživující Kondicionér
</a>
                <p class="text-lg leading-[23px] mt-6">Prémiové rostlinné složení se směsí čistých ingrediencí pro hloubkovou výživu a sílu.</p>
                <a href="produkty/pure-botanical-vyzivujici-kondicioner" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        mplexRepairingConditioner = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #A8BDD8">Výživa &amp; Oprava</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/m-plex-bond-repairing-kondicioner">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/805/conversions/lcomc0300-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/m-plex-bond-repairing-kondicioner" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    M-Plex Bond Repairing Kondicionér
</a>
                <p class="text-lg leading-[23px] mt-6">Obnovuje a chrání vlasové vazby díky technologii M-Plex Bond pro silnější a hladší vlasy.</p>
                <a href="produkty/m-plex-bond-repairing-kondicioner" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

    /////// CARE ///////

        protein = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #B8DED7">Zdravé Vlasy &amp; Pokožka</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/proteinovy-sprej">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/791/conversions/lcaps0250-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/proteinovy-sprej" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Proteinový Sprej
</a>
                <p class="text-lg leading-[23px] mt-6">Botanický proteinový komplex posiluje a rozčesává vlasy s antistatickými vlastnostmi a UV ochranou.</p>
                <a href="produkty/proteinovy-sprej" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        curlLotion = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #A292B4">Kontrola kudrlinek</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/curl-activating-lotion-mleko">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/833/conversions/lcaal0250-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/curl-activating-lotion-mleko" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
        Curl Activating Lotion Mléko
</a>
                <p class="text-lg leading-[23px] mt-6">Dokonalý podkladový krém s Aloe Vera, který okamžitě zajistí vlhkost a vytvoří výrazné kudrlinky bez krepatění.</p>
                <a href="produkty/curl-activating-lotion-mleko" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        antifrizzMask = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #A292B4">Kontrola kudrlinek</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/anti-frizz-vyhlazujici-maska">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/835/conversions/lcaam0200-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/anti-frizz-vyhlazujici-maska" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
        Anti-Frizz Vyhlazující Maska
</a>
                <p class="text-lg leading-[23px] mt-6">Intenzivně vyhlazuje a krotí krepatění vlasů díky naší inovativní technologii Biopolymer pro vyživené, hedvábné a poddajné vlasy.</p>
                <a href="produkty/anti-frizz-vyhlazujici-maska" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        diamondLeaveinConditioner = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #A8BDD8">Výživa &amp; Oprava</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/diamond-dust-vyzivujici-leave-in">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/810/conversions/lcadc0150-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/diamond-dust-vyzivujici-leave-in" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
        Diamond Dust Vyživující Leave-In  
</a>
                <p class="text-lg leading-[23px] mt-6">Intenzivní hydratace a transformace vlasů s jemnými diamanty a kokosovým olejem pro posílení, tepelnou ochranu a optimální zářivost.</p>
                <a href="produkty/diamond-dust-vyzivujici-leave-in" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        mplexMiracleMask = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #A8BDD8">Výživa &amp; Oprava</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/m-plex-zazracna-maska">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/813/conversions/lcamm0200-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/m-plex-zazracna-maska" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
        M-Plex Zázračná Maska
</a>
                <p class="text-lg leading-[23px] mt-6">Pomáhá obnovovat a chránit vlasy zevnitř, aby byly hladší a poddajnější.</p>
                <a href="produkty/m-plex-zazracna-maska" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;


    ///////// CREATE /////////

        fashionBlowoutSpray = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Create</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/fashion-edition-sprej-na-foukanou">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/852/conversions/lcrbo0200-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/fashion-edition-sprej-na-foukanou" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Fashion Edition Sprej Na Foukanou
</a>
                <p class="text-lg leading-[23px] mt-6">Objemový sprej na fénování s antioxidačním výtažkem z kořene zázvoru a UV ochranou s lehkou fixací.</p>
                <a href="produkty/fashion-edition-sprej-na-foukanou" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        fashionMousse = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Create</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/fashion-edition-mousse-objemova-pena">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/857/conversions/lcrvm0200-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/fashion-edition-mousse-objemova-pena" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Fashion Edition Mousse Objemová Pěna
</a>
                <p class="text-lg leading-[23px] mt-6">Create objem, definici a texturu od kořínků ke konečkům vlasů se středně silnou fixací.</p>
                <a href="produkty/fashion-edition-mousse-objemova-pena" class="inline-block underline text-lg leading-[23px] mt-6">
    Zobrazit produkt
</a>
</div>
</div>                </div>`;

        thickeningCream = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Create/span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/thickening-cream-posilujici-krem">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/863/conversions/lcrtc0150-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/thickening-cream-posilujici-krem" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
        Thickening Cream Posilující Krém
</a>
                <p class="text-lg leading-[23px] mt-6">Zahušťuje vlasy do nového rozměru díky technologii Revitaboost pro přirozený a plnější pocit.</p>
                <a href="produkty/thickening-cream-posilujici-krem" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        volumeFoam = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Create</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/volume-foam-objemova-pena">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/861/conversions/lcrvf0200-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/volume-foam-objemova-pena" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
        Volume Foam Volume Foam Objemová Pěna
</a>
                <p class="text-lg leading-[23px] mt-6">Dlouhotrvající objem s pružnou fixací a jemným finišem.
</p>
                <a href="produkty/volume-foam-objemova-pena" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        curlCream = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Create</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/curl-define-krem">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/869/conversions/lcrcc0150-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/curl-define-krem" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
        Curl Define Krém
</a>
                <p class="text-lg leading-[23px] mt-6">Hydratuje, vyhlazuje a definuje kudrny díky oleji z jojobových semínek a jemné, přirozené fixaci.</p>
                <a href="produkty/curl-define-krem" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        curlFoam = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Create</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/curl-define-foam">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/871/conversions/lcrcdf150-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/curl-define-foam" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Curl Define Foam
</a>
                <p class="text-lg leading-[23px] mt-6">Přirozená definice kadeří se střední fixací a odolností proti vlhkosti s výtažkem z lotosového květu.</p>
                <a href="produkty/curl-define-foam" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        antifrizzBalm = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Create</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/anti-frizz-vyhlazujici-balzam">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/867/conversions/lcrab0150-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/anti-frizz-vyhlazujici-balzam" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Anti-Frizz Vyhlazující Balzám
</a>
                <p class="text-lg leading-[23px] mt-6">Long-lasting smoothness with Baobab Seed Oil to seal the cuticle for silky, frizz-free and manageable hair.</p>
                <a href="produkty/anti-frizz-vyhlazujici-balzam" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        antifrizzMist = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Create</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/anti-frizz-vyhlazujici-mlha">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/865/conversions/lcram0150-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/anti-frizz-vyhlazujici-mlha" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Anti-Frizz Vyhlazující Mlha
</a>
                <p class="text-lg leading-[23px] mt-6">Beztížná mlha okamžitě krotí krepatění a chrání před vlhkostí, takže vlasy jsou poddajnější.</p>
                <a href="produkty/anti-frizz-vyhlazujici-mlha" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        fashionGel = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Create</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/fashion-edition-gel-na-vlasy">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/859/conversions/lcrgl0150-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/fashion-edition-gel-na-vlasy" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Fashion Edition Gel Na Vlasy Na Vlasy Na Vlasy
</a>
                <p class="text-lg leading-[23px] mt-6">Vysoce účinný stylingový gel s antioxidačním olejem z pšeničných klíčků pro dlouhotrvající střední fixaci a kontrolu vlhkosti.</p>
                <a href="produkty/fashion-edition-gel-na-vlasy" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        fashionHeatProtection = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Create</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/fashion-edition-mlha-chranici-pred-teplem">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/855/conversions/lcrhpm150-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/fashion-edition-mlha-chranici-pred-teplem" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Fashion Edition Mlha Chránící Před Teplem
</a>
                <p class="text-lg leading-[23px] mt-6">Chrání před UV zářením a poškozením teplem až do 230 °C/446 °F s vitamínem B5 pro jemný a hladký povrch.</p>
                <a href="produkty/fashion-edition-mlha-chranici-pred-teplem" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        fashionSeaSpray = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Create</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/fashion-edition-slany-sprej">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/849/conversions/lcrss0200-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/fashion-edition-slany-sprej" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Fashion Edition Slaný Sprej
</a>
                <p class="text-lg leading-[23px] mt-6">Texturní objem pro volné, přirozené a rozcuchané vlny s UV ochranou.</p>
                <a href="produkty/fashion-edition-slany-sprej" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

    //////// COMPLETE ////////

        fashionHairSpray = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Complete</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/fashion-edition-ultimate-lak-na-vlasy">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/873/conversions/lcmfh0250-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/fashion-edition-ultimate-lak-na-vlasy" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
        Fashion Edition Ultimate Lak Na Vlasy
</a>
                <p class="text-lg leading-[23px] mt-6">Velmi jemná, rychleschnoucí mlha s dlouhotrvající flexibilní fixací, provitamínem B5 a UV ochranou.</p>
                <a href="produkty/fashion-edition-ultimate-lak-na-vlasy" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`

        mattPaste = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Complete</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/hmatt-paste-matujici-pasta-50ml">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/894/conversions/lcmmp0050-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/hmatt-paste-matujici-pasta-50ml" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
        Matt Paste Matující Pasta 50ml
</a>
                <p class="text-lg leading-[23px] mt-6">Create si suchou, matnou texturu s kaolinovým jílem bohatým na minerály pro celodenní výdrž.</p>
                <a href="produkty/hmatt-paste-matujici-pasta-50ml" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        fashionTexturisingSpray = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Complete</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/fashion-edition-tvarujici-objemovy-sprej">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/882/conversions/lcmtvs200-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/fashion-edition-tvarujici-objemovy-sprej" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Fashion Edition Objemový Sprej Pro Úpravu Textury
</a>
                <p class="text-lg leading-[23px] mt-6">Okamžitá textura a objem na míru s dlouhotrvající fixací.</p>
                <a href="produkty/fashion-edition-tvarujici-objemovy-sprej" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        FashionDry = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Complete</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/fashion-edition-suchy-sampon">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/884/conversions/lcmds0200-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/fashion-edition-suchy-sampon" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Fashion Edition Suchý šampon
</a>
                <p class="text-lg leading-[23px] mt-6">Osvěžovač stylu a texturátor okamžitě absorbuje přebytečnou mastnotu.</p>
                <a href="produkty/fashion-edition-suchy-sampon" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        fashionHealthyMist = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Complete</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/fashion-edition-ozdravna-mlha-na-vlasy">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/888/conversions/lcmhhm200-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/fashion-edition-ozdravna-mlha-na-vlasy" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Fashion Edition Ozdravná Mlha Na Vlasy
</a>
                <p class="text-lg leading-[23px] mt-6">Zkrášlující mlha s vyživujícím sójovým proteinem okamžitě promění vlasy a dodá jim zdravější vzhled.</p>
                <a href="produkty/fashion-edition-ozdravna-mlha-na-vlasy" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        rejuvenatingOil = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Complete</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/rejuvenating-radiance-oil-rozjasnujici-olej">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/890/conversions/lcmro0100-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/rejuvenating-radiance-oil-rozjasnujici-olej" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
        Rejuvenating Radiance Oil Rozjasňující Olej
</a>
                <p class="text-lg leading-[23px] mt-6">Lehký olej s kyselinou hyaluronovou a bohatým arganovým olejem pro hloubkovou hydrataci a mladistvý lesk.</p>
                <a href="produkty/rejuvenating-radiance-oil-rozjasnujici-olej" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        fashionShineMist = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Complete</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/fashion-edition-lesk-na-vlasy">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/886/conversions/lcmsm0200-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/fashion-edition-lesk-na-vlasy" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Fashion Edition Ultimate Lak Na Vlasy
</a>
                <p class="text-lg leading-[23px] mt-6">Okamžitý lesk s arganovým olejem a UV ochranou.</p>
                <a href="produkty/fashion-edition-lesk-na-vlasy" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        fashionStylingCream = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Complete</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/fashion-edition-stylingovy-krem">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/900/conversions/lcmsc0150-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/fashion-edition-stylingovy-krem" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Fashion Edition Stylingový Krém
</a>
                <p class="text-lg leading-[23px] mt-6">Definovaná separace a textura se sójovými proteiny a lehkou fixací.</p>
                <a href="produkty/fashion-edition-stylingovy-krem" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        weightlessSouflee = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Complete</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/weightless-souffle">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/892/conversions/lcmws0120-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/weightless-souffle" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
        Weightless Soufflé
</a>
                <p class="text-lg leading-[23px] mt-6">Create si měkké, volné vlny nebo přirozenou texturu s máslem ze semínek Cupuacu, které hydratuje a obnovuje pružnost s lehkou fixací.</p>
                <a href="produkty/weightless-souffle" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        fashionVaxSpray = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Complete</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/fashion-edition-vosk-ve-spreji">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/879/conversions/lcmws0150-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/fashion-edition-vosk-ve-spreji" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
    Fashion Edition Vosk Ve Spreji
</a>
                <p class="text-lg leading-[23px] mt-6">Rychleschnoucí vosk ve spreji pro tvarování a úpravu vlasů, dodání textury, oddělení a lesku s lehkou fixací.</p>
                <a href="produkty/fashion-edition-vosk-ve-spreji" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

        deconstructor = `<div class="flex flex-col items-center text-center flex-none w-full mx-2 lg:mx-3 2xl:mx-4 md:w-[calc(50%-8px)] lg:w-[calc(33.33%-16px)] 2xl:w-[calc(33.33%-21px)]">
        <span class="px-6 py-3 text-lg leading-6 font-semimedium text-teal-900" style="background: #E4E1DC">Complete</span>
        <div class="mt-5 lg:mt-8 xl:mt-10">
<a href="produkty/deconstructor">
<img alt="" class="w-full aspect-square"  src="https://d3tlyp20mcsecl.cloudfront.net/media-library/898/conversions/lcmdc0050-bg-putty.jpg" width="1920" height="1920">

</a>
<div class="text-center text-teal-900 xl:mx-6 2xl:mx-12">
        <a href="produkty/deconstructor" class="inline-block mt-6 text-xl font-extrabold leading-5 tracking-tighter uppercase">
        Deconstructor
</a>
                <p class="text-lg leading-[23px] mt-6">Odličte svůj styl, Create silné definované textury s včelím voskem pro středně silnou fixaci.</p>
                <a href="produkty/deconstructor" class="inline-block underline text-lg leading-[23px] mt-6">
                Zobrazit produkt
</a>
</div>
</div>                </div>`;

    /////// NO 1 & NO 2 ////////

    if(choices[3] === "Žádný problém / zdravá údržba vlasů"){
        noOneList.push(honeyOatShampoo);
        noTwoList.push(honeyOatConditioner);
        if(choices[0] != "Tenké"){
            noOneList.push(honeyOatLemongrassShampoo);
            noTwoList.push(organicLemongrassConditioner);
        } else {
            noOneList.push(organicVolumisingShampoo, amarathThickeningShampoo);
            noTwoList.push(organicBlossomConditioner, amarathThickeningConditioner);
        }
    } else if(choices[3] === "Suché a poškozené vlasy"){
        noOneList.push(mplexRepairingShampoo);   
        noTwoList.push(diamondDustConditioner);
        if(choices[0] != "Tenké"){
            noOneList.push(diamondDustShampoo, pureBotanicalShampoo);
            noTwoList.push(diamondDustConditioner, pureBotanicalConditioner);
        } else {
            noOneList.push(pureBotanicalShampoo, amarathThickeningShampoo);
            noTwoList.push(pureBotanicalConditioner, amarathThickeningConditioner);
        }
    } else if(choices[3] === "Údržba barev"){
        noOneList.push(colourCareShampoo);
        noTwoList.push(vibrantColourConditioner);
        if(choices[0] != "Tenké"){
            noOneList.push(mplexRepairingShampoo, pureBotanicalShampoo);
            noTwoList.push(mplexRepairingConditioner, pureBotanicalConditioner);
        } else {
            noOneList.push(mplexRepairingShampoo, amarathThickeningShampoo);
            noTwoList.push(mplexRepairingConditioner, amarathThickeningConditioner);
        }
    } else if(choices[3] === "Údržba blond vlasů"){
        noOneList.push(coolBlondeShampoo);
        noTwoList.push(coolBlondeConditioner);
        if(choices[0] != "Tenké"){
            noOneList.push(mplexRepairingShampoo, pureBotanicalShampoo);
            noTwoList.push(mplexRepairingConditioner, pureBotanicalConditioner);
        } else {
            noOneList.push(mplexRepairingShampoo, amarathThickeningShampoo);
            noTwoList.push(mplexRepairingConditioner, amarathThickeningConditioner);
        }
    } else if(choices[3] === "Krepaté vlasy" || choices[3] === "Údržba kudrlin"){
        noOneList.push(royalAntiFrizzShampoo);
        noTwoList.push(royalAntiFrizzConditioner);
        if(choices[4] === "Žádný problém / zdravá údržba vlasů"){
            if(choices[0] != "Tenké"){
                noOneList.push(honeyOatShampoo, honeyOatLemongrassShampoo);
                noTwoList.push(honeyOatConditioner, organicLemongrassConditioner);}
            else {
                noOneList.push(honeyOatShampoo, amarathThickeningShampoo);
                noTwoList.push(honeyOatConditioner, amarathThickeningConditioner);
            }
        } else {
            if(choices[0] != "Tenké"){
                noOneList.push(mplexRepairingShampoo, pureBotanicalShampoo);
                noTwoList.push(mplexRepairingConditioner, pureBotanicalConditioner);
            } else {
                noOneList.push(mplexRepairingShampoo, amarathThickeningShampoo);
                noTwoList.push(mplexRepairingConditioner, amarathThickeningConditioner);
            }
        }
    }    

    //////// NO 3 ///////

    if(choices[5] === "Vlnité" || choices[5] === "Kudrlinky"){
        noThreeList.push(curlLotion, antifrizzMask, protein);
    } else if(choices[3] === "Suché a poškozené vlasy"){
        if(choices[5] === "Proti krepatění vlasů / Vyhlazení mých přírodních vlasů"){
            noThreeList.push(antifrizzMask, mplexMiracleMask, protein);
        } else {
            noThreeList.push(diamondLeaveinConditioner, mplexMiracleMask, protein);
        }
    } else {
        noThreeList.push(diamondLeaveinConditioner, protein);
    }

    //////// NO 4 ///////

    if(choices[5] === "Objem"){
        if(choices[2] === "Rovné"){
            if(choices[0] === "Tenké"){
                if(choices[3] === "Suché a poškozené vlasy"){
                    noFourList.push(fashionBlowoutSpray, volumeFoam, thickeningCream);
                } else {
                    noFourList.push(fashionBlowoutSpray, volumeFoam, fashionMousse);
                }
            } else if(choices[0] === "Střední"){
                if(choices[3] === "Suché a poškozené vlasy"){
                    noFourList.push(fashionBlowoutSpray, volumeFoam);
                } else {
                    noFourList.push(fashionBlowoutSpray, volumeFoam, fashionMousse);
                }
            } else {
                if(choices[3] === "Suché a poškozené vlasy"){
                    noFourList.push(fashionBlowoutSpray, volumeFoam);
                } else {
                    noFourList.push(fashionBlowoutSpray, volumeFoam, thickeningCream);
                }
            }
        } else if(choices[2] === "Vlnité"){
            if(choices[0] === "Tenké"){
                if(choices[3] === "Suché a poškozené vlasy"){
                    noFourList.push(fashionBlowoutSpray, volumeFoam, thickeningCream);
                } else {
                    noFourList.push(fashionBlowoutSpray, volumeFoam, fashionMousse);
                }
            } else if(choices[0] === "Střední"){
                if(choices[3] === "Suché a poškozené vlasy"){
                    noFourList.push(fashionBlowoutSpray, volumeFoam, fashionMousse);
                } else {
                    noFourList.push(fashionBlowoutSpray, volumeFoam, fashionMousse);
                }
            } else {
                if(choices[3] === "Suché a poškozené vlasy"){
                    noFourList.push(fashionBlowoutSpray, fashionMousse);
                } else {
                    noFourList.push(fashionBlowoutSpray, volumeFoam, fashionMousse);
                }
        }} else if(choices[2] === "Kudrnaté"){
                if(choices[0] === "Tenké"){
                    if(choices[3] === "Suché a poškozené vlasy"){
                            noFourList.push(curlCream, thickeningCream, fashionMousse);
                    } else {
                        noFourList.push(curlCream, volumeFoam, fashionMousse);
                    }
                } else if(choices[0] === "Střední"){
                    if(choices[3] === "Suché a poškozené vlasy"){
                        noFourList.push(curlCream, thickeningCream, fashionMousse);
                    } else {
                        noFourList.push(thickeningCream, volumeFoam, fashionMousse);
                    }
                } else {
                        noFourList.push(curlCream, fashionMousse);
                    
        }} else if(choices[2] === "Hustě Kudrnaté"){
                if(choices[0] === "Tenké"){
                    noFourList.push(curlCream, curlFoam, thickeningCream);
                } else if(choices[0] === "Střední"){
                    if(choices[3] === "Suché a poškozené vlasy"){
                        noFourList.push(antifrizzBalm, curlCream, thickeningCream);
                    } else {
                        noFourList.push(antifrizzBalm, curlFoam, thickeningCream);
                    }
                } else {
                    if(choices[3] === "Suché a poškozené vlasy"){
                        noFourList.push(antifrizzBalm, curlCream, thickeningCream);
                    } else {
                        noFourList.push(antifrizzBalm, curlFoam, thickeningCream);
                    }
            }}
    } else if(choices[5] === "Rovné vlasy"){
        if(choices[2] === "Rovné"){
            if(choices[0] === "Tenké"){
                noFourList.push(antifrizzMist, fashionBlowoutSpray, fashionGel);
            } else if(choices[0] === "Střední") {
                noFourList.push(antifrizzMist, antifrizzBalm, fashionHeatProtection);
            } else if(choices[0] === "Silné"){
                noFourList.push(antifrizzBalm, fashionHeatProtection, fashionGel);
            }
        }
        else{
            if(choices[0] === "Tenké"){
                noFourList.push(antifrizzMist, fashionHeatProtection, fashionGel);
            } else if(choices[0] === "Střední") {
                noFourList.push(antifrizzMist, antifrizzBalm, fashionHeatProtection);
            } else if(choices[0] === "Silné"){
                noFourList.push(antifrizzBalm, fashionHeatProtection, fashionGel);
            }
        }
    } else if(choices[5] === "Kudrlinky" || choices[5] === "Vlnité"){
        if(choices[2] === "Rovné"){
            noFourList.push(fashionHeatProtection, volumeFoam, fashionMousse);
        } else if(choices[2] === "Vlnité"){
            noFourList.push(curlCream, curlFoam, volumeFoam);
        } else {
            noFourList.push(curlCream, curlFoam);
        }
    } else if(choices[5] === "Textura vlasů"){
        if(choices[0] === "Tenké"){
            if(choices[2] === "Rovné" || choices[2] === "Vlnité"){
                noFourList.push(fashionBlowoutSpray, fashionSeaSpray, volumeFoam);
            } else {
                noFourList.push(curlCream, curlFoam, fashionSeaSpray);
            }
        } else if(choices[0] === "Střední"){
            if(choices[2] === "Rovné" || choices[2] === "Vlnité"){
                noFourList.push(fashionBlowoutSpray, fashionSeaSpray, fashionMousse);
            } else {
                noFourList.push(curlCream, curlFoam, fashionGel);
            }
        } else {
            if(choices[2] === "Rovné" || choices[2] === "Vlnité"){
                noFourList.push(fashionBlowoutSpray, fashionSeaSpray, fashionGel);
            } else {
                noFourList.push(curlCream, curlFoam, fashionSeaSpray);
            }
        }
    } else if(choices[5] === "Zahuštění"){
        noFourList.push(thickeningCream, volumeFoam);
    } else if(choices[5] === "Proti krepatění / Vyhlazení přírodních vlasů"){
        if(choices[0] === "Tenké"){
            if(choices[2] === "Rovné"){
                noFourList.push(fashionBlowoutSpray, antifrizzMist, fashionGel);
            } else if(choices[2] === "Vlnité" || choices[2] === "Kudrnaté"){
                noFourList.push(antifrizzMist, curlCream);
            } else {
                noFourList.push(antifrizzMist, curlCream, curlFoam);
            }
        } else if(choices[0] === "Střední"){
            if(choices[2] === "Rovné"){
                noFourList.push(antifrizzBalm, antifrizzMist, fashionGel);
            } else if(choices[2] === "Vlnité" || choices[2] === "Kudrnaté"){
                noFourList.push(antifrizzBalm, antifrizzMist, curlCream);
            } else {
                noFourList.push(antifrizzBalm, antifrizzMist);
            }
        } else {
            if(choices[2] === "Rovné"){
                noFourList.push(antifrizzBalm, fashionBlowoutSpray, fashionGel);
            } else if(choices[2] === "Kudrnaté"|| choices[2] === "Vlnité"){
                noFourList.push(antifrizzBalm, curlCream);
            } else {
                noFourList.push(antifrizzBalm, antifrizzMist);
            }
        }
    }

    //////// NO 5 ////////

    if(choices[5] === "Objem"){
        if(choices[1] === "Krátké"){
            noFiveList.push(fashionHairSpray, mattPaste, fashionTexturisingSpray);
        } else {
            noFiveList.push(FashionDry, fashionHairSpray, fashionTexturisingSpray);
        }
    } else if(choices[5] === "Rovné vlasy"){
        noFiveList.push(fashionHairSpray, fashionHealthyMist, rejuvenatingOil);
    } else if(choices[5] === "Kudrlinky"){
        if(choices[2] == "Rovné"){
            noFiveList.push(fashionHairSpray, fashionHealthyMist, rejuvenatingOil, fashionShineMist);
        } else {
            noFiveList.push(fashionHairSpray, rejuvenatingOil, fashionStylingCream, fashionShineMist, weightlessSouflee);
        }
    } else if(choices[5] === "Vlnité"){
        noFiveList.push(fashionHairSpray, fashionHealthyMist, fashionShineMist, weightlessSouflee);
    } else if(choices[5] === "Textura vlasů"){
        if(choices[2] === "Vlnité" || choices[2] === "Rovné vlasy"){
            if(choices[1] != "Krátké"){
                noFiveList.push(FashionDry, fashionHairSpray, fashionTexturisingSpray, weightlessSouflee, fashionVaxSpray);
            } else {
                noFiveList.push(deconstructor, FashionDry, fashionHairSpray, mattPaste, fashionStylingCream, fashionTexturisingSpray);
            }
        } else if(choices[2] === "Kudrnaté"){
            noFiveList.push(FashionDry, fashionHairSpray, weightlessSouflee, fashionVaxSpray);
        } else if(choices[2] === "Hustě Kudrnaté"){
            noFiveList.push(FashionDry, weightlessSouflee, fashionVaxSpray);
        }
    } else if(choices[5] === "Zahuštění"){
        if(choices[2] === "Kudrnaté" || choices[2] === "Hustě Kudrnaté"){
            noFiveList.push(fashionHairSpray, rejuvenatingOil, fashionShineMist, weightlessSouflee);
        } else {
            noFiveList.push(fashionHairSpray, fashionShineMist, fashionTexturisingSpray, weightlessSouflee);
        }
    } else if(choices[5] === "Proti krepatění / Vyhlazení přírodních vlasů"){
        noFiveList.push(fashionHairSpray, fashionHealthyMist, rejuvenatingOil, fashionShineMist);
    }

    no1.innerHTML = noOneList.join("");
    no2.innerHTML = noTwoList.join("");
    no3.innerHTML = noThreeList.join("");
    no4.innerHTML = noFourList.join("");
    no5.innerHTML = noFiveList.join("");
}






