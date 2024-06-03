let uploadedImages = [];

export function updateImagesSource(oldBlock, updatedImg){
    const oldImages = oldBlock.querySelectorAll("img");

    updatedImg.forEach((img) => {
        const index = img[0]
        oldImages[index].src = img[1]
        oldImages[index].setAttribute("data-relative-src", img[1])
        if (oldImages[index].hasAttribute("srcset")) {
            oldImages[index].removeAttribute("srcset");
            oldImages[index].onload = null;
        }
    })
}

export function updateChangedImages(images, block, dir) {
    const inputs = block.querySelectorAll("input[type='file']");
    const image = block.querySelectorAll(".content img")
    let i = 0
    let imageURLpath = ""
    while(i < dir){
        imageURLpath = imageURLpath + "../"
        i++
    }
    imageURLpath = imageURLpath + "images/"

    inputs.forEach((input, index) => {
        input.setAttribute("id", index);
        input.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if(file){
                let url = URL.createObjectURL(file);   
                image[input.id].src = url;
                image[input.id].setAttribute('data-relative-src', url)
                images.push([input.id ,imageURLpath + file.name]);
                uploadedImages.push(file);
            }
        });
    })

    return images
}

export async function sentImage() {

    if (uploadedImages.length !== 0) {      
        const formData = new FormData();
        uploadedImages.forEach((file) => {
            formData.append("image", file);
        });

        try {
            const response = await fetch('http://localhost:8080/api/upload/image', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const imagePath = await response.text();

            } else {
                console.error('Nastala chyba p�i nahr�v�n� obr�zku:', response.statusText);
            }
        } catch (error) {
            console.error('Nastala chyba p�i komunikaci se serverem.', error);
        }
    }
}