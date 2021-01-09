// import router from '../store/index'
// document.addEventListener('plusready', function (a) {
//     var first = '';
//     plus.key.addEventListener('backbutton', function () {
//       //获取地址栏目中的url
//       var urls = location.hash.split('/')[1]

//       if (urls === 'quotes' || urls === 'index' || urls === 'property' || urls === 'commun' || urls === 'userIndex') {//判断是一级页面的时候点击两次退出app
//         if (new Date().getTime() - first < 3000) {
//           plus.runtime.quit();//表示退出app
//         } else {
//           plus.nativeUI.toast('再按一次退出应用')
//           first = new Date().getTime();
//         }
//       } else {
//         // history.go(-1)
//         console.log(this.router)
//       }
//     }, false)
// }) 