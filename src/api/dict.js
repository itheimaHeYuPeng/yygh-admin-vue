import request from '@/utils/request'

export default {
  // 数据字典列表
  dictList(id) {
    return request({
      url: `http://localhost:8202/admin/cmn/dict/findChildrenData/${id}`,
      method: 'get'
    })
  }
}
