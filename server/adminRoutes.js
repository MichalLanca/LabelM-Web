// productRoutes.js
const express = require('express');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const path = require('path');
const User = require('./User'); 
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const staticPath = path.join(__dirname, 'admin');

router.use("/admin", express.static(staticPath));

router.use(cors());
const secretKey = crypto.randomBytes(32).toString('hex');


router.post('/register', async (req, res) => {
    
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Uživatel s tímto uživatelským jménem již existuje." });
        }

        const user = await createUser(username, email, password);
        await sendEmailToAdmin(username, email, user._id);
        res.status(201).redirect("/admin/");

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Chyba při registraci uživatele." });
    }
});


router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Neplatný email nebo heslo." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Neplatný email nebo heslo." });
        } 

        if(user.approved){          
            const token = jwt.sign({ username: user.username, userId: user._id }, secretKey, { expiresIn: '1h' });

            res.cookie("token", token, {
                // httpOnly: true,
            })


            const json = {page: "/admin/uvodni-stranka"}
            return res.send(json)

        } else {
            const json = {page: "/admin/neschvalena-autorizace.html"}
            res.send(json);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Chyba při přihlašování uživatele." });
    }
});

const requireAuth = (req, res, next) => {

    const token = req.cookies.token;

    try {
        const user = jwt.verify(token, secretKey);
        req.user = user;
        next();
    } catch (err){
        res.clearCookie("token");
        return res.status(301).redirect("/admin")
    }
};

router.get("/uvodni-stranka", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/uvodni-stranka.html'))
})

router.get("/uvodni-stranka.html", cors(), async (req, res) => {
    return res.redirect("/admin/uvodni-stranka")   
})

router.get("/jednotlive-produkty", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/jednotlive-produkty.html'))
})

router.get("/jednotlive-produkty.html", cors(), async (req, res) => {
    return res.redirect("/admin/jednotlive-produkty")   
})

router.get("/my-labelm", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/my-labelm.html'))
})

router.get("/my-labelm.html", cors(), async (req, res) => {
    return res.redirect("/admin/my-labelm")   
})

router.get("/o-nas", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/o-nas/index.html'))
})

router.get("/o-nas.html", cors(), async (req, res) => {
    return res.redirect("/admin/o-nas")   
})

router.get("/o-nas/dedictvi", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/o-nas/dedictvi.html'))
})

router.get("/o-nas/dedictvi.html", cors(), async (req, res) => {
    return res.redirect("/o-nas/dedictvi")   
})

router.get("/o-nas/biokompatibilita", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/o-nas/biokompatibilita.html'))
})

router.get("/o-nas/biokompatibilita.html", cors(), async (req, res) => {
    return res.redirect("/o-nas/biokompatibilita")   
})

router.get("/o-nas/vzdelavani", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/o-nas/vzdelavani.html'))
})

router.get("/o-nas/vzdelavani.html", cors(), async (req, res) => {
    return res.redirect("/o-nas/vzdelavani")   
})

router.get("/o-nas/digitalni-inovace", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/o-nas/digitalni-inovace.html'))
})

router.get("/o-nas/digitalni-inovace.html", cors(), async (req, res) => {
    return res.redirect("/o-nas/digitalni-inovace")   
})

router.get("/o-nas/matrix", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/o-nas/matrix.html'))
})

router.get("/o-nas/matrix.html", cors(), async (req, res) => {
    return res.redirect("/o-nas/matrix")   
})

router.get("/o-nas/moda", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/o-nas/moda.html'))
})

router.get("/o-nas/moda.html", cors(), async (req, res) => {
    return res.redirect("/o-nas/moda")   
})

router.get("/o-nas/odbornost", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/o-nas/odbornost.html'))
})

router.get("/o-nas/odbornost.html", cors(), async (req, res) => {
    return res.redirect("/o-nas/odbornost")   
})

router.get("/o-nas/udrzitelnost", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/o-nas/udrzitelnost.html'))
})

router.get("/o-nas/udrzitelnost.html", cors(), async (req, res) => {
    return res.redirect("/o-nas/udrzitelnost")   
})

router.get("/moda-a-trendy", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/moda-a-trendy/index.html'))
})

router.get("/o-nas/moda-a-trendy.html", cors(), async (req, res) => {
    return res.redirect("/o-nas/moda-a-trendy")   
})

router.get("/moda-a-trendy/zvyste-objem", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/moda-a-trendy/zvyste-objem.html'))
})

router.get("/o-nas/moda-a-trendy/zvyste-objem.html", cors(), async (req, res) => {
    return res.redirect("/o-nas/moda-a-trendy/zvyste-objem")   
})

router.get("/uprava-menu", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/uprava-menu.html'))

})

router.get("/uprava-menu.html", cors(), async (req, res) => {
    return res.redirect("/admin/uprava-menu")   
})

router.get("/produkty", cors(), requireAuth, async (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../public/admin/produkty.html'))

})

router.get("/produkty.html", cors(), async (req, res) => {
    return res.redirect("/admin/produkty")  
})

router.get("/socialni-site", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/socialni-site.html'))

})

router.get("/socialni-site.html", cors(), async (req, res) => {
    return res.redirect("/admin/socialni-site")   
})

router.get("/profesionalove", cors(), requireAuth, async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/profesionalove.html'))

})

router.get("/profesionalove.html", cors(), async (req, res) => {
    return res.redirect("/admin/profesionalove")   
})

router.get("/registrace", cors(), async (req, res) => {

    return res.sendFile(path.resolve(__dirname, '../public/admin/registrace.html'))

})





router.get('/schvalit-uzivatele', cors(), async (req, res) => {
    try {
        const userId = req.query.id;

        await User.findByIdAndUpdate(userId, { $set: { approved: true } });

        res.sendFile(path.resolve(__dirname, '../public/admin/potvrzeni-noveho-uzivatele.html'))

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Chyba při schvalování uživatele." });
    }
});


const createUser = async (username, email, password) => {
    try {
      const user = new User({
        username: username,
        email: email,
        password: password,
        approved: false
      });
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
};


const sendEmailToAdmin = async (username, email, userId) => {

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'labelm.schvaleni.uzivatelu@gmail.com',
                pass: 'aqhj gcmz ubsq xiyq'
            },
            tls: {
                rejectUnauthorized: false 
            }
        });

        const approveUrl = `https://my-labelm.cz/admin/schvalit-uzivatele?id=${userId}`;

        const mailOptions = {
            from: 'labelm.schvaleni.uzivatelu@gmail.com',
            to: 'pavlak@italystyle.cz',
            subject: 'Nový uživatel potřebuje schválení',
            text: `Dobrý den,\n\nNový uživatel ${username} s e-mailem ${email} se zaregistroval. Prosím, proveďte jeho schválení: ${approveUrl}.\n\nHezký den`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw error;
    }
};



module.exports = router;