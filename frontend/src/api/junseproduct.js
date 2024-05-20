import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function submitFormData(userId, formData, success, fail) {
  

    console.log("@@@@@@ subbmit js ")

        console.log(userId);
       await local.post(`/junseproduct/junse/${userId}`, formData).then(success).catch(fail);
    

        //await local.delete(`/user/delete/${userId}`).then(success).catch(fail);

}
async function getJunseInfo(userId, success, fail) {
    console.log("@@@@@@ getJunseInfo js");
    console.log(userId)
    await local.get(`/junseproduct/junse/list/${userId}`).then(success).catch(fail);
}

export { submitFormData ,getJunseInfo};