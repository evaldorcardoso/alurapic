export default class PhotoService {
    constructor(resource) {
        this._resource = resource('v1/fotos{/id}');
    }

    register(photo) {
        let foto = {
            titulo: photo.title,
            url: photo.url,
            descricao: photo.description
        }
        // console.log(foto);        
        if(photo._id){
            foto._id = photo._id;
            return this._resource.update({ id: foto._id }, foto);
        }
        else{
            return this._resource.save(foto);
        }
    }

    list() {
        return this._resource.query().then(res => res.json(),
            err => {
                console.log(err);
                throw new Error('Não foi possível obter a lista de fotos');
            });
    }

    delete(id) {
        return this._resource.delete({ id })
            .then(null, err => {
                console.log(err);
                throw new Error('Não foi possível remover a foto');
            });                
    }

    get(id) {
        return this._resource.get({ id }).then(res => res.json());
    }
}