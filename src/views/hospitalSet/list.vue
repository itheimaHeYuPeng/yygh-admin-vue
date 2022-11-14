<template>
  <div>
    <div style="margin: 20px 0px 0px 10px">
      <!--表单查询-->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchObj.hosname" placeholder="医院名称" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="danger" @click="removeRows()">批量删除</el-button>
      </el-form>
    </div>
    <div>
      <!--数据展示列表-->
      <el-table
        :data="list"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        >>
        <el-table-column type="selection" />
        <el-table-column prop="hosname" label="医院名称" />
        <el-table-column prop="hoscode" label="医院编号" />
        <el-table-column prop="apiUrl" label="api基础路径" />
        <el-table-column prop="contactsName" label="联系人姓名" />
        <el-table-column prop="contactsPhone" label="联系人手机" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '可用' : '不可用' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="320" align="center">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeDataById(scope.row.id)"
              >删除</el-button
            >
            <el-button
              v-if="scope.row.status == 1"
              type="primary"
              icon="el-icon-delete"
              size="mini"
              @click="lockHostSet(scope.row.id, 0)"
              >锁定</el-button
            >
            <el-button
              v-if="scope.row.status == 0"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="lockHostSet(scope.row.id, 1)"
              >取消锁定</el-button
            >
            <router-link :to="'/hospitalSet/edit/' + scope.row.id">
              <el-button type="primary" size="mini" icon="el-icon-edit"
                >编辑</el-button
              >
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin: 20px auto">
      <!--分页-->
      <el-pagination
        :current-page="current"
        :page-size="limit"
        :total="total"
        style="padding:30px0;text-align:center;"
        layout="total,prev,pager,next,jumper"
        @current-change="getList"
      />
    </div>
  </div>
</template>

<script>
import hospitalSet from '@/api/hospitalSet.js'

export default {
  name: 'YyghAdminVueList',

  data() {
    return {
      current: 1, // 当前页
      limit: 5, // 每页的条数
      searchObj: {}, // 搜索条件对象
      list: [], // 页面展示的数据
      total: 0,
      idList: [] // 批量删除医院设置的id数组
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    // 修改锁的状态
    lockHostSet(id, status) {
      hospitalSet
        .updateLockStatus(id, status)
        .then(response => {
          this.$message({
            message: '状态修改成功',
            type: 'success'
          })
          this.getList()
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: 'error'
          })
        })
    },
    // 获取复选框中的id值
    handleSelectionChange(val) {
      console.log(val)
      for (let i = 0; i < val.length; i++) {
        this.idList.push(val[i].id)
      }
    },
    // 批量删除
    removeRows() {
      this.$confirm('此操作将永久批量删除医院设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospitalSet
          .batchDeleteHospitalSet(this.idList)
          .then(response => {
            console.log(response)
            this.$message({
              message: '批量删除成功',
              type: 'success'
            })
            this.getList()
          })
          .catch(err => {
            console.log(err)
            this.$message.error('批量删除失败')
          })
      })
    },
    // 列表查询
    getList(page = 1) {
      this.current = page
      hospitalSet
        .getHospitalSetList(this.current, this.limit, this.searchObj)
        .then(response => {
          console.log(response)
          this.list = response.data.records
          this.total = response.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 删除
    removeDataById(id) {
      this.$confirm('此操作将永久删除医院设置信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospitalSet
          .removeHospitalSetById(id)
          .then(response => {
            console.log(response)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getList()
          })
          .catch(err => {
            console.log(err)
            this.$message.error('删除失败')
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
