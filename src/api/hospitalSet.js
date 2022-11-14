import request from '@/utils/request'

export default {
  // 查询医院设置列表
  getHospitalSetList(current, limit, searchObj) {
    return request({
      url: `http://localhost:8201/admin/hosp/hospitalSet/pages/${current}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  // 删除医院设置
  removeHospitalSetById(id) {
    return request({
      url: `http://localhost:8201/admin/hosp/hospitalSet/delete/${id}`,
      method: 'delete'
    })
  },
  // 批量删除医院设置
  batchDeleteHospitalSet(idList) {
    return request({
      url: `http://localhost:8201/admin/hosp/hospitalSet/batchDelete`,
      method: 'delete',
      data: idList
    })
  },
  // 修改锁的状态 0：可用 1：不可用
  updateLockStatus(id, status) {
    return request({
      url: `http://localhost:8201/admin/hosp/hospitalSet/lockSet/${id}/${status}`,
      method: 'put'
    })
  },
  // 添加医院设置
  addHospitalSet(hospitalSet) {
    return request({
      url: `http://localhost:8201/admin/hosp/hospitalSet/save`,
      method: 'post',
      data: hospitalSet
    })
  },
  // 根据id查询医院设置
  getHospitalSetById(id) {
    return request({
      url: `http://localhost:8201/admin/hosp/hospitalSet/list/${id}`,
      method: 'get'
    })
  },
  // 修改医院设置
  updateHospitalSet(hospitalSet) {
    return request({
      url: `http://localhost:8201/admin/hosp/hospitalSet/update`,
      method: 'post',
      data: hospitalSet
    })
  }
}
