// productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('./Product'); 
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const multer = require('multer');



router.use(express.static(path.join(__dirname, '../public/')));


router.get('/products', cors(), async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/products/:id', cors(), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        oldHTMLName = product.name;
        if (!product) {
            return res.status(404).json({ message: 'Produkt nenalezen' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/html/main_page', cors(), async (req, res) => {
    const filename = "index.html";
    const filePath = path.join(__dirname, '..', 'public', filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const sections = extractSections(data);
        const html = sections.join('\n');
        res.send(html);
    });
});

router.get('/html/about_us', cors(), async (req, res) => {
    const filename = "index.html";
    const filePath = path.join(__dirname, '..', 'public/o-nas', filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractMainInnerHTML(data);

        res.send(html);
    });
});

router.get('/html/my_labelm', cors(), async (req, res) => {
    const filename = "my-labelm.html";
    const filePath = path.join(__dirname, '..', 'public', filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractMainInnerHTML(data);

        res.send(html);
    });
});

router.get('/html/professionals', cors(), async (req, res) => {
    const filename = "profesionalove.html";
    const filePath = path.join(__dirname, '..', 'public', filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractMainInnerHTML(data);

        res.send(html);
    });
});

router.get('/html/menu', cors(), async (req, res) => {
    const filename = "index.html";
    const filePath = path.join(__dirname, '..', 'public', filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractNavInnerHTML(data);

        res.send(html);
    });
});

router.get('/html/social_networks', cors(), async (req, res) => {
    const filename = "index.html";
    const filePath = path.join(__dirname, '..', 'public', filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractSectionInnerHTML(data);

        res.send(html);
    });
});

router.get("/html/products", cors(), async (req, res) => {
    const filename = "index.html"
    const filePath = path.join(__dirname, "..", "public", "produkty", filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractMainInnerHTML(data);

        res.send(html);
    });    
})

router.get("/html/about_us/heritage", cors(), async (req, res) => {
    const filename = "dedictvi.html"
    const filePath = path.join(__dirname, "..", "public/o-nas", filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractMainInnerHTML(data);

        res.send(html);
    });    
})

router.get("/html/about_us/biocompatibility", cors(), async (req, res) => {
    const filename = "biokompatibilita.html"
    const filePath = path.join(__dirname, "..", "public/o-nas", filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractMainInnerHTML(data);

        res.send(html);
    });    
})

router.get("/html/about_us/education", cors(), async (req, res) => {
    const filename = "vzdelavani.html"
    const filePath = path.join(__dirname, "..", "public/o-nas", filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractMainInnerHTML(data);

        res.send(html);
    });    
})

router.get("/html/about_us/digital_inovation", cors(), async (req, res) => {
    const filename = "digitalni-inovace.html"
    const filePath = path.join(__dirname, "..", "public/o-nas", filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractMainInnerHTML(data);

        res.send(html);
    });    
})

router.get("/html/about_us/matrix", cors(), async (req, res) => {
    const filename = "matrix.html"
    const filePath = path.join(__dirname, "..", "public/o-nas", filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractMainInnerHTML(data);

        res.send(html);
    });    
})

router.get("/html/about_us/fashion", cors(), async (req, res) => {
    const filename = "moda.html"
    const filePath = path.join(__dirname, "..", "public/o-nas", filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractMainInnerHTML(data);

        res.send(html);
    });    
})

router.get("/html/about_us/expertise", cors(), async (req, res) => {
    const filename = "odbornost.html"
    const filePath = path.join(__dirname, "..", "public/o-nas", filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractMainInnerHTML(data);

        res.send(html);
    });    
})

router.get("/html/about_us/sustainability", cors(), async (req, res) => {
    const filename = "udrzitelnost.html"
    const filePath = path.join(__dirname, "..", "public/o-nas", filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractMainInnerHTML(data);

        res.send(html);
    });    
})

router.get("/html/fashion_trends", cors(), async (req, res) => {
    const filename = "index.html"
    const filePath = path.join(__dirname, "..", "public/moda-a-trendy", filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }

        const html = extractMainInnerHTML(data);

        res.send(html);
    });    
})

function extractSections(htmlString) {
    const regex = /<main[^>]*>[\s\S]*?<\/main>/gi;
    const mainContent = (htmlString.match(regex) || [])[0] || '';
    const sectionRegex = /<section[^>]*>[\s\S]*?<\/section>/gi;
    const sections = mainContent.match(sectionRegex) || []; 
    return sections.map(section => section.trim());
}

function extractMainInnerHTML(htmlString) {
    const dom = new JSDOM(htmlString);
    const mainElement = dom.window.document.querySelector('main');
    if (mainElement) {
        return mainElement.innerHTML;
    } else {
        return '';
    }
}

function extractSectionInnerHTML(htmlString) {
    const dom = new JSDOM(htmlString);
    const sectionElements = dom.window.document.querySelectorAll('section');
    const lastSectionIndex = sectionElements.length - 2;
    const lastSection = sectionElements.item(lastSectionIndex);
    if (lastSection) {
        return lastSection.innerHTML;
    } else {
        return '';
    }
}

function extractNavInnerHTML(htmlString) {
    const dom = new JSDOM(htmlString);
    const navElement = dom.window.document.querySelector('header nav');
    if (navElement) {
        return navElement.innerHTML;
    } else {
        return '';
    }
}

function removeExtraSpaces(text) {
    return text.replace(/\s+/g, ' ').trim();
}

async function updateHTMLFiles(menuData, directory, tag) {
    try {
        const files = await fs.promises.readdir(directory);
        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = await fs.promises.stat(filePath);
            if (stat.isDirectory()) {
                await updateHTMLFiles(menuData, filePath, tag);
            } else if (file.endsWith('.html')) { 
                const data = await fs.promises.readFile(filePath, 'utf8');
                const dom = new JSDOM(data);
                const document = dom.window.document;
                let asideElement;
                let asideText
                if(tag === "nav"){
                    asideElement = document.querySelector("nav").innerHTML;
                    for (const key in menuData) {
                        if (Object.hasOwnProperty.call(menuData, key)) {
                            const value = menuData[key];
                            console.log(value, key)
                            asideText = asideElement.replace(value, key);
                        }
                    }
                    document.querySelector("nav").innerHTML = asideText
                } else if(tag === "section"){
                    function removeTrailingSlash(str) {
                        if (str.endsWith('/')) {
                            return str.slice(0, -1);
                        }
                        return str;
                    }
                    sections = document.querySelectorAll("section");
                    const lastSectionIndex = sections.length - 2;
                    const lastSection = sections.item(lastSectionIndex);
                    asideElement = lastSection.innerHTML;
                    for (const key in menuData) {
                        if (Object.hasOwnProperty.call(menuData, key)) {
                            const value = removeTrailingSlash(menuData[key]);
                            console.log(value, key)
                            asideText = asideElement.replace(`"${value}"`, key);

                        }
                    }
                    sections = document.querySelectorAll("section");
                    sections[sections.length - 2].innerHTML = asideText
                }
                
                const updatedHtmlString = dom.serialize();
                fs.writeFile(filePath, updatedHtmlString, 'utf8', (err) => {
                        if (err) {
                            console.error('Chyba p�i z�pisu do souboru:', err);
                            return res.status(500).send('Nastala chyba p�i z�pisu do souboru');
                        }
                        console.log(`Soubor ${file} byl �sp�n� aktualizov�n.`);
                    });
            }
        }
    } catch (error) {
        console.error(`Error updating HTML file:`, error);
    }
}

router.post('/products', cors(), async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/html/main_page', cors(), async (req, res) => {
    const modifiedSections = req.body; 
    const filename = "index.html";
    const savePath = path.join(__dirname, '..', 'public', filename); 

    fs.readFile(savePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }
        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;
        const mainContent = document.querySelector("main");
        const mainDiv = document.querySelector("main div");
        mainContent.innerHTML = "";
        const temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = modifiedSections;
        mainContent.appendChild(mainDiv);
        temporaryDiv.querySelectorAll("section").forEach((section) => {
            mainContent.appendChild(section)
        })
        const updatedHTML = dom.serialize();

        fs.writeFile(savePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    });
});

router.post('/html/about_us', cors(), async (req, res) => {
    const modifiedSections = req.body; 
    const filename = "index.html";
    const savePath = path.join(__dirname, '..', 'public/o-nas', filename); 

    fs.readFile(savePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }
        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;
        const mainContent = document.querySelector("main");
        mainContent.innerHTML = "";
        const temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = modifiedSections;
        const children = Array.from(temporaryDiv.children);
        children.forEach((child) => {
            mainContent.appendChild(child)
        })
        const updatedHTML = dom.serialize();

        fs.writeFile(savePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    });
});

router.post('/html/about_us/heritage', cors(), async (req, res) => {
    const modifiedSections = req.body; 
    const filename = "dedictvi.html";
    const savePath = path.join(__dirname, '..', 'public/o-nas', filename); 

    fs.readFile(savePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }
        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;
        const mainContent = document.querySelector("main");
        mainContent.innerHTML = "";
        const temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = modifiedSections;
        const children = Array.from(temporaryDiv.children);
        children.forEach((child) => {
            mainContent.appendChild(child)
        })
        const updatedHTML = dom.serialize();

        fs.writeFile(savePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    });
});

router.post('/html/about_us/biocompatibility', cors(), async (req, res) => {
    const modifiedSections = req.body; 
    const filename = "biokompatibilita.html";
    const savePath = path.join(__dirname, '..', 'public/o-nas', filename); 

    fs.readFile(savePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }
        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;
        const mainContent = document.querySelector("main");
        mainContent.innerHTML = "";
        const temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = modifiedSections;
        const children = Array.from(temporaryDiv.children);
        children.forEach((child) => {
            mainContent.appendChild(child)
        })
        const updatedHTML = dom.serialize();

        fs.writeFile(savePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    });
});

router.post('/html/about_us/education', cors(), async (req, res) => {
    const modifiedSections = req.body; 
    const filename = "vzdelavani.html";
    const savePath = path.join(__dirname, '..', 'public/o-nas', filename); 

    fs.readFile(savePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }
        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;
        const mainContent = document.querySelector("main");
        mainContent.innerHTML = "";
        const temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = modifiedSections;
        const children = Array.from(temporaryDiv.children);
        children.forEach((child) => {
            mainContent.appendChild(child)
        })
        const updatedHTML = dom.serialize();

        fs.writeFile(savePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    });
});

router.post('/html/about_us/digital_inovation', cors(), async (req, res) => {
    const modifiedSections = req.body; 
    const filename = "digitalni-inovace.html";
    const savePath = path.join(__dirname, '..', 'public/o-nas', filename); 

    fs.readFile(savePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }
        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;
        const mainContent = document.querySelector("main");
        mainContent.innerHTML = "";
        const temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = modifiedSections;
        const children = Array.from(temporaryDiv.children);
        children.forEach((child) => {
            mainContent.appendChild(child)
        })
        const updatedHTML = dom.serialize();

        fs.writeFile(savePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    });
});

router.post('/html/about_us/matrix', cors(), async (req, res) => {
    const modifiedSections = req.body; 
    const filename = "matrix.html";
    const savePath = path.join(__dirname, '..', 'public/o-nas', filename); 

    fs.readFile(savePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }
        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;
        const mainContent = document.querySelector("main");
        mainContent.innerHTML = "";
        const temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = modifiedSections;
        const children = Array.from(temporaryDiv.children);
        children.forEach((child) => {
            mainContent.appendChild(child)
        })
        const updatedHTML = dom.serialize();

        fs.writeFile(savePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    });
});

router.post('/html/about_us/fashion', cors(), async (req, res) => {
    const modifiedSections = req.body; 
    const filename = "moda.html";
    const savePath = path.join(__dirname, '..', 'public/o-nas', filename); 

    fs.readFile(savePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }
        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;
        const mainContent = document.querySelector("main");
        mainContent.innerHTML = "";
        const temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = modifiedSections;
        const children = Array.from(temporaryDiv.children);
        children.forEach((child) => {
            mainContent.appendChild(child)
        })
        const updatedHTML = dom.serialize();

        fs.writeFile(savePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    });
});

router.post('/html/about_us/expertise', cors(), async (req, res) => {
    const modifiedSections = req.body; 
    const filename = "odbornost.html";
    const savePath = path.join(__dirname, '..', 'public/o-nas', filename); 

    fs.readFile(savePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }
        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;
        const mainContent = document.querySelector("main");
        mainContent.innerHTML = "";
        const temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = modifiedSections;
        const children = Array.from(temporaryDiv.children);
        children.forEach((child) => {
            mainContent.appendChild(child)
        })
        const updatedHTML = dom.serialize();

        fs.writeFile(savePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    });
});

router.post('/html/about_us/sustainability', cors(), async (req, res) => {
    const modifiedSections = req.body; 
    const filename = "udrzitelnost.html";
    const savePath = path.join(__dirname, '..', 'public/o-nas', filename); 

    fs.readFile(savePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }
        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;
        const mainContent = document.querySelector("main");
        mainContent.innerHTML = "";
        const temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = modifiedSections;
        const children = Array.from(temporaryDiv.children);
        children.forEach((child) => {
            mainContent.appendChild(child)
        })
        const updatedHTML = dom.serialize();

        fs.writeFile(savePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    });
});

router.post('/html/fashion_trends', cors(), async (req, res) => {
    const modifiedSections = req.body; 
    const filename = "index.html";
    const savePath = path.join(__dirname, '..', 'public/moda-a-trendy', filename); 

    fs.readFile(savePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }
        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;
        const mainContent = document.querySelector("main");
        mainContent.innerHTML = "";
        const temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = modifiedSections;
        const children = Array.from(temporaryDiv.children);
        children.forEach((child) => {
            mainContent.appendChild(child)
        })
        const updatedHTML = dom.serialize();

        fs.writeFile(savePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    });
});

router.post('/html/my_labelm', cors(), async (req, res) => {
    const modifiedSections = req.body; 
    const filename = "my-labelm.html";
    const savePath = path.join(__dirname, '..', 'public', filename); 

    fs.readFile(savePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }
        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;
        const mainContent = document.querySelector("main");
        mainContent.innerHTML = "";
        const temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = modifiedSections;
        const children = Array.from(temporaryDiv.children);
        children.forEach((child) => {
            mainContent.appendChild(child)
        })
        const updatedHTML = dom.serialize();

        fs.writeFile(savePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    });
});

router.post('/html/professionals', cors(), async (req, res) => {
    const modifiedSections = req.body; 
    const filename = "profesionalove.html";
    const savePath = path.join(__dirname, '..', 'public', filename); 

    fs.readFile(savePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba při čtení souboru:", err);
            res.status(500).send("Nastala chyba při čtení souboru.");
            return;
        }
        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;
        const mainContent = document.querySelector("main");
        mainContent.innerHTML = "";
        const temporaryDiv = document.createElement("div");
        temporaryDiv.innerHTML = modifiedSections;
        const children = Array.from(temporaryDiv.children);
        children.forEach((child) => {
            mainContent.appendChild(child)
        })
        const updatedHTML = dom.serialize();

        fs.writeFile(savePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    });
});

router.post("/html/menu", cors(), async (req, res) => {
    const menuData = req.body;
    const publicDir = path.join(__dirname, '../public');
    await updateHTMLFiles(menuData, publicDir, "nav");
    res.send('Menu updated successfully.');
})

router.post("/html/social_networks", cors(), async (req, res) => {
    const menuData = req.body;
    const publicDir = path.join(__dirname, '../public');
    await updateHTMLFiles(menuData, publicDir, "section");
    res.send('Social Networks updated successfully.');
})

router.post("/html/products", cors(), async (req, res) => {
    const filename = "index.html"
    const filePath = path.join(__dirname, "..", "public", "produkty", filename);
    const updatedData = req.body;

    fs.readFile(filePath, 'utf8', (err, loadedHTML) => {
        if (err) {
            console.error("Nastala chyba p�i �ten� souboru:", err);
            res.status(500).send("Nastala chyba p�i �ten� souboru.");
            return;
        }

        const dom = new JSDOM(loadedHTML);
        const document = dom.window.document;

        if(updatedData[0]){
            const ranges = document.querySelectorAll(".carousel a");

            ranges.forEach((range) => {
                let i = 0;
                while(i < updatedData[0].length){
                    if(range.href === updatedData[0][i][0]){
                        range.href = updatedData[0][i][1]
                    }
                    const image = range.querySelector("img");
                    if(image.src === updatedData[0][i][0]){
                        image.src = updatedData[0][i][1]  
                        if(image.hasAttribute("srcset")){
                            image.removeAttribute("srcset");
                            image.onload = null;
                        }
                        break
                    }
                    i++;
                }
            })

        }
        if(updatedData[1]){
            const slider = document.querySelectorAll(".carousel-b .flex-none");

            slider.forEach((product, index) => {
                if(product.textContent != updatedData[1][index][1]){
                    product.querySelector("img").src = updatedData[1][index][0];
                    if(product.querySelector("img").hasAttribute("srcset")){
                        product.querySelector("img").removeAttribute("srcset");
                        product.querySelector("img").onload = null;
                    }
                    const hrefs = product.querySelectorAll("a");
                    let i = 0;
                    hrefs.forEach((href) => {
                        href.href = updatedData[1][index][1].toLowerCase().replace(/\s+/g, "-").replace(/-?&/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                        if(i === 1){
                            href.textContent = updatedData[1][index][1];
                        }
                        i++;
                    })
                }
            })
        }
        if(updatedData[2]){
            const filterButtons = document.querySelectorAll(".dropdown_menu button legend");
            const filterItems = document.querySelectorAll(".dropdown_menu .mb-4");

            filterButtons.forEach((button) => {
                i = 0;
                while(i < updatedData[2].length){
                    let content = removeExtraSpaces(button.textContent)
                    if(content === updatedData[2][i][0]){
                        button.textContent = updatedData[2][i][1];
                    }
                    i++;
                }
            })
            filterItems.forEach((item) => {
                i = 0;
                while(i < updatedData[2].length){
                    let content = removeExtraSpaces(item.textContent);
                    if(content === updatedData[2][i][0]){
                        const adjustedText = item.querySelectorAll("span");
                        adjustedText[1].textContent = updatedData[2][i][1];
                    }
                    i++;
            }
            })
        }

        const updatedHTML = dom.serialize();
        fs.writeFile(filePath, updatedHTML, (err) => {
            if (err) {
                console.error("Nastala chyba při ukládání upraveného HTML souboru:", err);
                res.status(500).send("Nastala chyba při ukládání upraveného HTML souboru.");
                return;
            }
            console.log("Upravený HTML byl úspěšně uložen na serveru.");
            res.status(200).send("Upravený HTML byl úspěšně uložen na serveru.");
        });
    }); 
});


// Nastavení pro ukládání obrázků
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/images/');
        console.log('Ukl�dac� cesta:', uploadPath);
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        console.log('Ukl�dac� jm�no souboru:', file.originalname)
        cb(null, file.originalname); 
    }
});

const videoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/video/'); // Složka pro ukládání videí
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const uploadImage = multer({ 
    storage: imageStorage,
}).array("image", 10);

const uploadVideo = multer({storage: videoStorage}).single("video");


router.post('/upload/image', uploadImage, (req, res) => {
    console.log("P�ij�m�m po�adavek na nahr�n� obr�zku");
    const imagePath = req.files.map(file => file.path); 
    console.log("obrazek nahran");
    res.send(`Image uploaded: ${imagePath}`);
});


router.post('/upload/video', (req, res) => {
    uploadVideo(req, res, (err) => {
        if (err) {
            console.log(req.file.path);
            return res.status(500).send(err);
        }
        const videoPath = req.file.path; 
        console.log("video nahráno");
        res.send(`Video uploaded: ${videoPath}`);
    });
});


router.put('/products/:id', cors(), async (req, res) => {
    const productId = req.params.id;
    const { url } = req.body;
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        updateHTML(url, req.body);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



function updateHTML(url, updatedData){
    
    const filePath = path.join(__dirname, '..', 'public', 'produkty', url); 
    fs.readFile(filePath, 'utf8', (err, HTMLString) => {
        if (err) {
            console.error('Chyba p�i �ten� souboru:', err);
            return res.status(500).send('Nastala chyba p�i �ten� souboru');
        }
        const dom = new JSDOM(HTMLString);
        const document = dom.window.document;
        const images = document.querySelectorAll("img");

        if(updatedData.image_main){
            images[0].src = updatedData.image_main;
            if(images[0].hasAttribute("srcset")){
                images[0].removeAttribute("srcset");
                images[0].onload = null;
            }
        }
        if(updatedData.image_small){
            images[1].src = updatedData.image_small;
            if(images[1].hasAttribute("srcset")){
                images[1].removeAttribute("srcset");
                images[1].onload = null;
            }
        }
        if(images[3].hasAttribute("srcset")){
            images[3].removeAttribute("srcset");
            images[4].removeAttribute("srcset");
            images[5].removeAttribute("srcset");
            images[3].onload = null;
            images[4].onload = null;
            images[5].onload = null;
        }
        if(updatedData.image_range){
            const oldSvg = document.querySelector("svg.w-20.mx-auto.mt-8");
            oldSvg.setAttribute("viewBox", updatedData.image_range[0]);
            oldSvg.setAttribute("style", updatedData.image_range[1]);
            oldSvg.innerHTML = updatedData.image_range[2];
        }
        if(updatedData.video){
            if(document.querySelector("iframe")){
                const videoDiv = document.querySelector(".vimeo_div");
                videoDiv.classList.add("justify-center", "items-center");
                document.querySelector(".vimeo_product").remove();
                document.querySelector(".toggle_muted").remove();
                const newDiv = document.createElement("div");
                newDiv.classList.add("vimeo_product");
                newDiv.setAttribute("data-vimeo-initialized", "true");
                newDiv.innerHTML = `
                <video controls width="240" height="426" preload="metadata" data-ready="true" class="h-[100vh] w-[100%]">
                    <source src="${updatedData.video}" type="video/mp4">
                </video>    
                </div>`;
                const firstChild = videoDiv.firstChild;
                videoDiv.insertBefore(newDiv, firstChild);
                document.querySelector(".vimeo_product source").src = updatedData.video;
                videoDiv.style.display = "none";
            } else if(document.querySelector("video")){
                document.querySelector("video source").src = updatedData.video;
            }
        }
        if(updatedData.name){
            document.querySelector("h1.font-extrabold.uppercase").textContent = updatedData.name;
        }
        if(updatedData.description){
            document.querySelector("div.max-w-screen-md.mx-auto.leading-6.px-8.text-center p").textContent = updatedData.description;
        }
        const paragraph = document.querySelectorAll("p.mt-6");
        if(updatedData.available){
            paragraph[0].textContent = "K dispozici v: " + updatedData.available;
        }
        if(updatedData.points){
            paragraph[1].textContent = updatedData.points;
        }
        if(updatedData.desc_short){
            list = document.querySelector("div.max-w-screen-md.mx-auto.leading-6.px-8.text-center ul");
            list.innerHTML = "";
            updatedData.desc_short.forEach((point) => {
                const newLi = document.createElement("li");
                newLi.textContent = point;
                list.appendChild(newLi);
            });
        }
        if(updatedData.ingredients){
            list = document.querySelector("div.grid.mx-auto.mt-16 ul");
            list.innerHTML = "";
            updatedData.ingredients.forEach((ingredient) => {
                const newLi = document.createElement("li");
                newLi.textContent = ingredient;
                list.appendChild(newLi);
            });
        }
        if(updatedData.use){
            const useDiv = document.querySelectorAll("div.max-w-screen-md.mx-auto.leading-6.px-8.text-center div");
            useDiv[2].textContent = updatedData.use;
        }
        if(updatedData.next_products){
            const nextProducts = document.querySelector(".grid.grid-cols-2.gap-4.mx-4.mt-12")
            const nextProductsImages = nextProducts.querySelectorAll("img");
            const nextProductNames = nextProducts.querySelectorAll("a");
            nextProductsImages.forEach((image, index) => {
                image.src = updatedData.next_products[index][1];
                const name = updatedData.next_products[index][0];
                const adjustedName = name.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                nextProductNames[(index * 2)].href = adjustedName;
                nextProductNames[(index * 2 + 1)].href = adjustedName;
                nextProductNames[(index * 2 + 1)].textContent = name;
        })
        }
        
        const updatedHtmlString = dom.serialize();
        fs.writeFile(filePath, updatedHtmlString, 'utf8', (err) => {
                if (err) {
                    console.error('Chyba p�i z�pisu do souboru:', err);
                    return res.status(500).send('Nastala chyba p�i z�pisu do souboru');
                }
                console.log(`Soubor ${url} byl �sp�n� aktualizov�n.`);
            });
    });
}

module.exports = router;