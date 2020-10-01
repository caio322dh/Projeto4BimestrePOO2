import { Router, request } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import ensureAuthenticated from '../middleawares/ensureAuthenticated';

import UsuariosController from '../app/controllers/UsuariosController'
import Usuarios from '../app/models/Usuarios';
import uploadConfig from '../config/upload';

const usuariosRouter = Router();
const upload = multer(uploadConfig);



usuariosRouter.post('/', async (request, response) => {
    try {
        const { nome, email, password } = request.body;

        const usuariosController = new UsuariosController();

        const user = await usuariosController.store({
            nome,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    }   catch (erro) {
        return response.status(400).json({ error: erro.message });
    }
});

usuariosRouter.get('/', ensureAuthenticated, async (request, response) => {
    const usuariosRepositorio = getRepository(Usuarios)
    const user = await usuariosRepositorio.find();
    console.log(request.user);
    delete user[0].password;
    return response.json(user);
});


usuariosRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const { id } = request.params;
    const user = await usuariosRepositorio.findOne(id);
    return response.json(user);
});


usuariosRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const { id } = request.params;
    await usuariosRepositorio.delete(id);
    return response.send();
});

usuariosRouter.patch('/avatar', ensureAuthenticated,
upload.single('avatar'),
async (request, response) => {
    console.log(request.file);
    return response.json({ ok: true });
},
);

export default usuariosRouter;
