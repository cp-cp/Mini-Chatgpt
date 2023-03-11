<template>
    <el-tabs type="border-card">
      <el-tab-pane label="播放数据详情">
        <el-select v-model="time" placeholder="请选择时间" style="width:200px;margin: 20px">
          <el-option v-for="item in timeType" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="program" placeholder="请选择节目类型" style="width:200px;margin: 20px">
          <el-option v-for="item in programType" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="topRank" placeholder="请选择Top" style="width:200px;margin: 20px">
          <el-option v-for="item in TopSelect" :key="item" :label="item" :value="item" />
        </el-select>
        <el-table :data="tableData" style="width: 100%" :cell-style="{ textAlign: 'center' }">
          <el-table-column  type="index" align="center" :resizable="false" label="排名" width="100">
            <template slot-scope="scope" ><!--</template>style="position: relative; width: 160px; height: 80px;">-->
              <span v-if="scope.$index+1 == 1">{{topRank}}</span>
              <span v-else-if="scope.$index+1 == 2">
                <svg-icon icon-class="排行榜" style="width: 60px; height: 60px"></svg-icon>
                <span style="position: relative;left: -37px;bottom: 25px;color: brown;size: 60px;font-weight: bolder">1</span>
              </span>
              <span v-else-if="scope.$index+1 == 3">
                <svg-icon icon-class="排行榜" style="width: 60px; height: 60px"></svg-icon>
                <span style="position: relative;left: -37px;bottom: 25px;color: brown;size: 60px;font-weight: bolder">2</span>
              </span>
              <span v-else-if="scope.$index+1 == 4">
                <svg-icon icon-class="排行榜" style="width: 60px; height: 60px"></svg-icon>
                <span style="position: relative;left: -37px;bottom: 25px;color: brown;size: 60px;font-weight: bolder">3</span>
              </span>
              <span v-else >
                <svg-icon icon-class="排行榜grey" style="width: 55px; height: 53px"></svg-icon>
                <span style="position: relative;left: -35px;bottom: 27px;color: brown;size: 60px;font-weight: bolder">{{scope.$index}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column v-for="(item,key) in columnDate" width="180" :key="item" :prop="item" :label="item" align="left">
            <template slot="header">
              <span style="font-weight: bold">{{columnDate[key]}}</span>
              <span v-if="columnDateType[key] === '工作日'" style="border-color: #409EFF;color: #409EFF;border-style: solid;border-width: thin">{{columnDateType[key]}}</span>
              <span v-if="columnDateType[key] === '双休日'" style="border-color: #13ce66;color: #13ce66;border-style: solid;border-width: thin">{{columnDateType[key]}}</span>
            </template>
            <template slot-scope="scope">
              <div align="left">
                <span v-if="scope.row[`${item}`] instanceof Array">
                <span style="text-align: justify">{{ scope.row[`${item}`][0] }}</span>
                <br>
                <span>{{ scope.row[`${item}`][1] }}</span>
                <span>&#8194;</span>
                <span v-if="scope.row[`${item}`][2].includes('-')" style="color: lightgreen">{{ scope.row[`${item}`][2] }}</span>
                <span v-else-if="scope.row[`${item}`][2] === '0.00%'" style="color: #1890ff">{{ scope.row[`${item}`][2] }}</span>
                <span v-else style="color: red">{{ scope.row[`${item}`][2] }}</span>
                <span>&#8194;</span>
                <span v-if="scope.row[`${item}`][2].includes('-')">
                  <svg-icon icon-class="箭头_向下"></svg-icon>
                </span>
                <span v-else-if="scope.row[`${item}`][2] === '0.00%'">
                  <svg-icon icon-class="横线"></svg-icon>
                </span>
                <span v-else>
                  <svg-icon icon-class="箭头_向上"></svg-icon>
                </span>
              </span>
                <span v-else>
                <span>{{ scope.row[`${item}`] }}</span>
              </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
  name: 'vuetest',
  data() {
    return {
      time: '',
      program: '',
      topRank: '',
      timeType: ['日','周','月'],
      programType: ['全部','电影','电视剧','综艺'],
      TopSelect: ['Top10','Top100'],
      columnDate: ['09-16','09-15','09-14','09-13','09-12','09-11','09-10'],
      columnDateType: ['工作日','工作日','工作日','工作日','双休日','双休日','工作日'],
      emptyData: [''],
      tableData: [{
        '09-16':'90.9%',
        '09-15':'90.34%',
        '09-14':'90.14%',
        '09-13':'90.11%',
        '09-12':'89.22%',
        '09-11':'90.59%',
        '09-10':'90.84%'
      },{
        '09-16':['开心锤锤',19222,'-1.27%'],
        '09-15':['开心锤锤',19469,'-6.51%'],
        '09-14':['开心锤锤',20825,'-6.56%'],
        '09-13':['开心锤锤',22288,'-39.88%'],
        '09-12':['开心锤锤',37075,'-8.58%'],
        '09-11':['开心锤锤',40555,'19.67%'],
        '09-10':['开心锤锤',33888,'0.00%']
      },{
        '09-16':['一生一世',6605,'27.86%'],
        '09-15':['宇宙护卫队之钢甲霸王龙',6231,'-4.64%'],
        '09-14':['小猪佩奇第二季',8137,'-27.25%'],
        '09-13':['小猪佩奇第二季',11185,'-28.92%'],
        '09-12':['小猪佩奇第二季',15736,'-3.54%'],
        '09-11':['白蛇2',17782,'42.53%'],
        '09-10':['宇宙护卫队之钢甲霸王龙',13046,'0.00%']
      },{
        '09-16':['代号山豹',6140,'14.89%'],
        '09-15':['小猪佩奇第二季',5576,'-31.47%'],
        '09-14':['宇宙护卫队之钢甲霸王龙',6534,'-22.24%'],
        '09-13':['宇宙护卫队之钢甲霸王龙',8403,'-44.49%'],
        '09-12':['宇宙护卫队之钢甲霸王龙',15138,'-12.68%'],
        '09-11':['宇宙护卫队之钢甲霸王龙',17337,'32.89%'],
        '09-10':['小猪佩奇第二季',12992,'0.00%']
      },{
        '09-16':['宇宙护卫队之钢甲霸王龙',5925,'-4.91%'],
        '09-15':['代号山豹',5313,'29.59%'],
        '09-14':['白蛇2',5163,'15.09%'],
        '09-13':['一生一世',5331,'-34.05%'],
        '09-12':['白蛇2',12104,'-31.93%'],
        '09-11':['小猪佩奇第二季',16313,'25.56%'],
        '09-10':['白蛇2',12476,'0.00%']
    },{
        '09-16':['小猪佩奇第二季',5137,'-7.87%'],
        '09-15':['一生一世',5166,'0.96%'],
        '09-14':['一生一世',5117,'-4.01%'],
        '09-13':['叫我僵小鱼',5239,'-35.43%'],
        '09-12':['新大头儿子小头爸爸',8298,'-24.65%'],
        '09-11':['新大头儿子小头爸爸',11012,'46.61%'],
        '09-10':['周生如故',8182,'0.00%']
      }
      ]
    }
  },
  methods: {

  }
}
</script>
