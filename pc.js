const axios = require('axios');

axios.interceptors.response.use(
	response => {
		if (response.status == 200) {
			return response.data
		}
	}
);

(async function () {
	const a = await axios.get('http://120.76.222.26:8002/queryArrearageList?communityId=47734f87-3a2f-478c-adeb-8be436685b97&pageNum=2&pageSize=500&sortType=0&houseName=&houseHoldName=&mobile=&searchParams=&status=1&token=0ad6e000-a4dc-4c7c-9c6b-e6717f765f28')
	const list = a.content.houseList
	list.forEach(d => getdata(d.houseUuid))
})()


async function getdata (houseUuid) {
	let data = await axios.get(`http://120.76.222.26:8002/getHouseBankdetail?pageIndex=1&pageSize=10&houseUuid=${houseUuid}&token=0ad6e000-a4dc-4c7c-9c6b-e6717f765f28`)
	console.log(houseUuid, data.totalRecord)
}
