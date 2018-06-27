import { ctDetail } from './list.js'

let getDetail = (id, suc) => ctDetail('type=album&page_size=10&id='+id+'&page=1',suc);
let getShow = (id, suc) => ctDetail('type=show&id=' + id , suc);

export{
  getDetail,
  getShow
}