<template>
  <div id="app">
    <pdf-js-vue style="height: 800px;" title="text.pdf" :src="url"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: function () {
    return {
      ojbList: [
        '61c9135f14907f0001b1468d',
        '61c9135f14907f0001b1468f',
        '61c9135f14907f0001b1468c',
        '61c9135f14907f0001b1468e',
        '61c9135f14907f0001b14690'
      ],
      url: 'http://192.168.0.20:5555/api-oa/system/common/showPdf?objId=61c9135f14907f0001b1468d&access_token=',
      token: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdUeXBlS2V5TGlzdCI6WyJhZG1pbiJdLCJvcmdOYW1lIjoi5oOg5bee5biC5bqU5oCl566h55CG5bGAIiwidXNlcl9uYW1lIjoibG1qIiwidXNlcklkIjoiMWIwMzVjMzgtZDUzNC00ZWI0LTlhYzAtNjIzYjY3MjYxZTc0Iiwib3JnSWQiOiI5ZDE2OTkwOC02MmNiLTQwYjItYWVjOS1hNzRiNTdiMjNiMDAiLCJjbGllbnRfaWQiOiJzZXJ2ZXItYWRtaW4iLCJyZWFsbmFtZSI6IueUqOaIt-WQjSIsImxpY2Vuc2UiOiJ2Z3MgbGljZW5zZSIsInNjb3BlIjpbInNwY2xvdWQiLCJzcGNsb3VkY29ycCJdLCJwYXNzd29yZFN0YXRlIjoiMSIsInN0YXRlIjoiMSIsImV4cCI6MTY0MDYxMDgyNCwianRpIjoiNmFmZWI5MGYtZjkyYS00NGQ5LWFlMTItMmYxY2NlZTNhMzcwIiwib3JnU3RhdGUiOiIxIiwidXNlcm5hbWUiOiJsbWoifQ.gv1Z99-vnAZ7OsgREpECB1X2_5NG2ZysQTSX7PcDJbo'
    }
  }
}
</script>
