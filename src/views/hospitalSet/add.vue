<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="医院名称">
        <el-input v-model="hospitalSet.hosname" />
      </el-form-item>
      <el-form-item label="医院编号">
        <el-input v-model="hospitalSet.hoscode" />
      </el-form-item>
      <el-form-item label="api基础路径">
        <el-input v-model="hospitalSet.apiUrl" />
      </el-form-item>
      <el-form-item label="联系人姓名">
        <el-input v-model="hospitalSet.contactsName" />
      </el-form-item>
      <el-form-item label="联系人手机">
        <el-input v-model="hospitalSet.contactsPhone" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import hosp from '@/api/hospitalSet.js'

export default {
  name: 'VueAdd',

  data() {
    return {
      hospitalSet: {}
    }
  },

  mounted() {
    // 获取到路由地址中的id
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id
      this.getHospSetById(id)
    } else {
      this.hospitalSet = {}
    }
  },

  methods: {
    // 通过id查询医院设置
    getHospSetById(id) {
      hosp
        .getHospitalSetById(id)
        .then(response => {
          console.log(response)
          this.hospitalSet = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 添加
    save() {
      hosp
        .addHospitalSet(this.hospitalSet)
        .then(response => {
          console.log(response)
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          // 跳转至医院设置列表
          this.$router.push({ path: '/hospitalSet/list' })
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: 'error'
          })
        })
    },
    // 修改
    update() {
      hosp
        .updateHospitalSet(this.hospitalSet)
        .then(response => {
          console.log(response)
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          // 跳转至医院设置列表
          this.$router.push({ path: '/hospitalSet/list' })
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: 'error'
          })
        })
    },
    saveOrUpdate() {
      console.log(this.hospitalSet.id)
      if (!this.hospitalSet.id) {
        this.save()
      } else {
        this.update()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
