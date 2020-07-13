<template>
  <div class="dash-broad">
    <!-- 4大汇总 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="iconfont inconfont1">&#xe61a;</span>
          <div class="dingdan">
            <span class="dingdanspan">总订单</span>
            <br />120,400
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="iconfont inconfont2">&#xe67c;</span>
          <div class="dingdan">
            <span class="dingdanspan">总销售额</span>
            <br />120,400
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="iconfont inconfont3">&#xe613;</span>
          <div class="dingdan">
            <span class="dingdanspan">今日订单数</span>
            <br />120,400
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <span class="iconfont inconfont4">&#xe632;</span>
          <div class="dingdan">
            <span class="dingdanspan">今日销售额</span>
            <br />120,400
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- echar报表 -->
    <div ref="myChart" :style="{width: '1300px', height: '500px'}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  //DOM渲染完后
  mounted() {
     // 1准备
     const myChart= this.$echarts.init(this.$refs.myChart)
      // 2.配置
     const option=({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 500, 901, 934, 1290, 500, 1300],
            type: "line"
          }
        ]
      });
      //应用配置
      myChart.setOption(option)
  },
};
</script>

<style lang="less" scoped>
.dash-broad {
  .el-row {
    .el-col {
      .bg-purple {
        display: flex;
        .dingdan {
          margin-left: 20px;
          line-height: 25px;
          color: #404950;
          font-weight: bolder;
          .dingdanspan {
            color: #d2d4d6;
          }
        }
      }
      .iconfont {
        font-size: 48px;
      }
      .inconfont1 {
        color: #28a0de;
      }
      .inconfont2 {
        color: #df5b9c;
      }
      .inconfont3 {
        color: #2ea2df;
      }
      .inconfont4 {
        color: #6bfc74;
      }
    }
  }
}
</style>