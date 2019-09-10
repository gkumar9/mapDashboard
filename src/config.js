// let config = {
//   allpins: "../api/rs/claro/maps/all/pins",
//   minigrid: "../api/rs/claro/maps/asset/info/minigrid",
//   patvan: "../api/rs/claro/maps/asset/info/patvan",
//   rooftop: "../api/rs/claro/maps/asset/info/rooftop",
//   irrigation: "../api/rs/claro/maps/asset/info/pump/irrigation",
//   drinkingwater: "../api/rs/claro/maps/asset/info/pump/drinkingwater",
//   LogoutServlet: "../LogoutServlet",
//   rmslist: "../rms/api/rs/assets/list",
//   highchartdata: "../rms/api/rs/asset/highchart/data",
//   allassetstat: "../rms/api/rs/all/assets/stats",
//   singleassetstat: "../rms/api/rs/asset/stats",
//   fvcstat: "../rms/api/rs/asset/activity",
//   hourtrans: "../iaas/api/rs/highchart/transaction/byduration",
//   revenue: "../iaas/api/rs/highchart/revenue/bytimeline",
//   iaaspatvan: "../iaas/api/rs/highchart/revenue/bypatvan",
//   iaasrevenueyearly: "../iaas/api/rs/highchart/revenue/yearly",
//   iaasrevenuemonthly: "../iaas/api/rs/highchart/revenue/monthly/",
//   iaasrevenuedaily: "../iaas/api/rs/highchart/revenue/daily/",
//   iaasstats: "../iaas/api/rs/widget/home",
//   transactionlist: "../iaas/api/rs/transactionlist",
//   farmerstate: "../farmerinfo/farmerstats/india",
//   farmerdistrict: "../farmerinfo/farmerstats/india/",
//   farmertable: "../farmerinfo/farmerstats/india/",
//   farmerinfo: "../farmerinfo/farmerinfo",
//   farmercoordinates: "../farmerinfo/farmercoordinates",
//   rmseditget: "../clarosupport/assets/rms/pump/details/",
//   updatermsedit: "../clarosupport/assets/rms/pump/update/",
//   farmerlist: "../clarosupport/farmerinfo/list/",
//   getfarmer: "../clarosupport/farmerinfo/details/",
//   updatefarmer: "../clarosupport/farmerinfo/farmer/update/",
//   getfarmerschema: "../clarosupport/farmerinfo/farmer/schema/",
//   addfarmernew: "../clarosupport/farmerinfo/farmer/",
//   searchfarmer: "../clarosupport/farmerinfo/search/list/",
//   getfarmerpumplist: "../clarosupport/assets/rms/pump/farmer/list/",
//   getfarmercroplist: "../clarosupport/crop/list/",
//   getfarmerimg: "../clarosupport/media/list/",
//   getcropschema: "../clarosupport/crop/schema/",
//   getdeviceschema: "../clarosupport/asset/rms/pump/schema/",
//   updatecrop: "../clarosupport/crop/update/",
//   updateimg: "../clarosupport/media/update/",
//   addrms: "../clarosupport/assets/rms/pump/",
//   addcrop: "../clarosupport/crop/add/",
//   addimg: "../clarosupport/media/add",
//   getrmsrooftop:"../clarosupport/assets/rms/rooftop/details/",
//   updatermsrooftop:"../clarosupport/assets/rms/rooftop/update/",
//   agroallassets:"../agro/api/rs/all/pins/",
//   agromandiassets:"../agro/api/rs/asset/info/mandi",
//   agrocenter:"../agro/api/rs/asset/info/centre",
//   agrooffice:"../agro/api/rs/asset/info/office",
//   agromarket:"../agro/api/rs/asset/info/market",
//   agrocustomer:"../agro/api/rs/asset/info/customer"
// };

let config = {
  allpins: "http://staging.clarolabs.in:7060/api/rs/claro/maps/all/pins",
  minigrid:
    "http://staging.clarolabs.in:7060/api/rs/claro/maps/asset/info/minigrid",
  patvan:
    "http://staging.clarolabs.in:7060/api/rs/claro/maps/asset/info/patvan",
  rooftop:
    "http://staging.clarolabs.in:7060/api/rs/claro/maps/asset/info/rooftop",
  irrigation:
    "http://staging.clarolabs.in:7060/api/rs/claro/maps/asset/info/pump/irrigation",
  drinkingwater:
    "http://staging.clarolabs.in:7060/api/rs/claro/maps/asset/info/pump/drinkingwater",
  LogoutServlet: "http://staging.clarolabs.in:7060/LogoutServlet",
  rmslist: "http://staging.clarolabs.in:7060/rms/api/rs/assets/list",
  highchartdata:
    "http://staging.clarolabs.in:7060/rms/api/rs/asset/highchart/data",
  allassetstat: "http://staging.clarolabs.in:7060/rms/api/rs/all/assets/stats",
  singleassetstat: "http://staging.clarolabs.in:7060/rms/api/rs/asset/stats",
  fvcstat: "http://staging.clarolabs.in:7060/rms/api/rs/asset/activity",
  hourtrans:
    "http://staging.clarolabs.in:7060/iaas/api/rs/highchart/transaction/byduration",
  revenue:
    "http://staging.clarolabs.in:7060/iaas/api/rs/highchart/revenue/bytimeline",
  iaaspatvan:
    "http://staging.clarolabs.in:7060/iaas/api/rs/highchart/revenue/bypatvan",
  iaasrevenueyearly:
    "http://staging.clarolabs.in:7060/iaas/api/rs/highchart/revenue/yearly",
  iaasrevenuemonthly:
    "http://staging.clarolabs.in:7060/iaas/api/rs/highchart/revenue/monthly/",
  iaasrevenuedaily:
    "http://staging.clarolabs.in:7060/iaas/api/rs/highchart/revenue/daily/",
  iaasstats: "http://staging.clarolabs.in:7060/iaas/api/rs/widget/home",
  transactionlist:
    "http://staging.clarolabs.in:7060/iaas/api/rs/transactionlist",
  farmerstate: "http://staging.clarolabs.in:7060/farmerinfo/farmerstats/india",
  farmerdistrict:
    "http://staging.clarolabs.in:7060/farmerinfo/farmerstats/india/",
  farmertable: "http://staging.clarolabs.in:7060/farmerinfo/farmerstats/india/",
  farmerinfo: "http://staging.clarolabs.in:7060/farmerinfo/farmerinfo",
  farmercoordinates:
    "http://staging.clarolabs.in:7060/farmerinfo/farmercoordinates",
  rmseditget:
    "http://staging.clarolabs.in:7060/clarosupport/assets/rms/pump/details/",
  updatermsedit:
    "http://staging.clarolabs.in:7060/clarosupport/assets/rms/pump/update/",
  farmerlist: "http://staging.clarolabs.in:7060/clarosupport/farmerinfo/list/",
  getfarmer:
    "http://staging.clarolabs.in:7060/clarosupport/farmerinfo/details/",
  updatefarmer:
    "http://staging.clarolabs.in:7060/clarosupport/farmerinfo/farmer/update/",
  getfarmerschema:
    "http://staging.clarolabs.in:7060/clarosupport/farmerinfo/farmer/schema/",
  addfarmernew:
    "http://staging.clarolabs.in:7060/clarosupport/farmerinfo/farmer/",
  searchfarmer:
    "http://staging.clarolabs.in:7060/clarosupport/farmerinfo/search/list/",
  getfarmerpumplist:
    "http://staging.clarolabs.in:7060/clarosupport/assets/rms/pump/farmer/list/",
  getfarmercroplist: "http://staging.clarolabs.in:7060/clarosupport/crop/list/",
  getfarmerimg: "http://staging.clarolabs.in:7060/clarosupport/media/list/",
  getcropschema: "http://staging.clarolabs.in:7060/clarosupport/crop/schema/",
  getdeviceschema:
    "http://staging.clarolabs.in:7060/clarosupport/asset/rms/pump/schema/",
  updatecrop: "http://staging.clarolabs.in:7060/clarosupport/crop/update/",
  updateimg: "http://staging.clarolabs.in:7060/clarosupport/media/update/",
  addrms: "http://staging.clarolabs.in:7060/clarosupport/assets/rms/pump/",
  addcrop: "http://staging.clarolabs.in:7060/clarosupport/crop/add/",
  addimg: "http://staging.clarolabs.in:7060/clarosupport/media/add",
  getrmsrooftop:"http://staging.clarolabs.in:7060/clarosupport/assets/rms/rooftop/details/",
  updatermsrooftop:"http://staging.clarolabs.in:7060/clarosupport/assets/rms/rooftop/update/",
  agroallassets:"http://staging.clarolabs.in:7060/agro/api/rs/all/pins/",
  agromandiassets:"http://staging.clarolabs.in:7060/agro/api/rs/asset/info/mandi",
  agrocenter:"http://staging.clarolabs.in:7060/agro/api/rs/asset/info/centre",
  agrooffice:"http://staging.clarolabs.in:7060/agro/api/rs/asset/info/office",
  agromarket:"http://staging.clarolabs.in:7060/agro/api/rs/asset/info/market",
  agrocustomer:"http://staging.clarolabs.in:7060/agro/api/rs/asset/info/customer"
};

export default config;
