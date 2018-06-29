import { ctDetail } from './list.js'

let getDetail = (id, suc) => ctDetail('type=album&page_size=10&id='+id+'&page=1',suc);
let getShow = (id, suc) => ctDetail('type=show&id=' + id + '&page_size=10&page=1', suc);
let getList = (id, showid, suc) => ctDetail('type=skip_show&id=' + id + '&shows=' + showid +'&page_size=10&page=1',suc);

export{
  getDetail,
  getShow,
  getList
}