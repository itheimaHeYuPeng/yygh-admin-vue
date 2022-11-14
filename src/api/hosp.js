import request from '@/utils/request'

export default {
  // 查询医院列表
  getHospitalSetList(page, limit, searchObj) {
    return request({
      url: `http://localhost:8201/admin/hosp/hospital/findHospital/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  // 根据dictcode查询所有子节点，所有的省
  findByDictcode(dictcode) {
    return request({
      url: `http://localhost:8202/admin/cmn/dict/findByDictCode/${dictcode}`,
      method: 'get'
    })
  },
  // 根据id查询所有子节点列表
  findByParentId(id) {
    return request({
      url: `http://localhost:8202/admin/cmn/dict/findChildrenData/${id}`,
      method: 'get'
    })
  },
  // 修改医院的状态
  updateHospStatus(id, status) {
    return request({
      url: `http://localhost:8201/admin/hosp/hospital/updateHospStatus/${id}/${status}`,
      method: 'get'
    })
  },
  // 查看医院详情
  getHospById(id) {
    return request({
      url: `http://localhost:8201/admin/hosp/hospital/showHospDetail/${id}`,
      method: 'get'
    })
  }
}
