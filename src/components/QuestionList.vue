<template>
    <div>
        <el-table
        :data="tableData"
        stripe
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
                        <el-form-item label="content">
                            <span>{{ props.row.content }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="id">
            </el-table-column>
            <el-table-column prop="asker" label="asker" width="180">
            </el-table-column>
            <el-table-column prop="content" label="content" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                tableData: [{asker:"",content:"",id:""}]
            }
        },
        methods: {
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
                axios.get('http://localhost:8080/questions/all')
                .then(response => {
                    this.tableData=response.data;
                    //console.log(this.tableData);
                })
                .catch(error => {
                    console.log(error);
                });
                return [];
            },
        },
        mounted() {
            this.loadAll();
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
</style>