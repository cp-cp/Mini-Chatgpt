<template>
    <div>
        <el-table
        :data="tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)"
        stripe
        height="550px"
        border
        style="width: 100%;height: 100%;">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="id">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="asker">
                            <span>{{ props.row.asker }}</span>
                        </el-form-item>
                        <el-form-item label="title">
                            <span>{{ props.row.title }}</span>
                        </el-form-item>
                        <el-form-item label="content">
                            <span>{{ props.row.content }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column   :key="uniqueKey" prop="id" label="id"></el-table-column>
            <el-table-column  :key="uniqueKey"  prop="asker" label="asker" width="180"></el-table-column>
            <el-table-column   :key="uniqueKey" prop="title" label="title" width="180"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <like 
                    :questionId="scope.row.id"
                    :key="uniqueKey"
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    ></like>
                    <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
`       <el-pagination align='center' 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="currentPage" 
        :page-sizes="[1,5,10,20]" 
        :page-size="pageSize" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="tableData.length">
        </el-pagination>
    </div>
</template>
<script>
    import axios from 'axios';
    import store from '@/store/store';
import Like from './Like.vue';
    export default {
  components: { Like },
        data() {
            return {
                tableData: [],
                currentPage: 1, // 当前页码
                pageSize: 8, // 每页的数据条数
                uniqueKey: 0,
            }
        },
        methods: {
            deleteRow(index, rows) {
                //await this.wait(100);
                this.uniqueKey++;
                this.loadAll();
                rows.splice(index, 1);
            },
            //每页条数改变时触发 选择一页显示多少行
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
            },
            //当前页改变时触发 跳转其他页
            handleCurrentChange(val) {
                this.uniqueKey++;
                console.log(`当前页: ${val}`);
                this.currentPage = val;
            },
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('date');
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            loadAll() {
                axios.get(`http://localhost:8080/user/likedQuestions/${store.state.userid}`)
                    .then(response => {
                    this.tableData = response.data;
                    console.log(response);
                    })
                    .catch(error => {
                    console.log(error);
                    });
                },
            },
        mounted() {
            this.loadAll();
            setInterval(() => {
            this.uniqueKey++
            }, 10000)
        },
    }
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-left: 30px;
    margin-bottom: 0;
    width: 50%;
  }
  .el-form-item{
    margin-top: 18px;
    margin-bottom: 18px;
  }
</style>