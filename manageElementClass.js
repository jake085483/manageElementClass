// 전역 변수, 나중에 클래스로 변경할 것
const temperaturesGroup = {
  경기도: [
    [10, 0],
    [5, -5],
    [11, 1],
    [18, 7],
    [23, 12],
    [27, 18],
    [29, 22],
    [30, 22],
    [25, 15],
    [19, 8],
    [11, 1],
    [4, -5]
  ]
};

const printHour =( hourNum )=> {
	if( hourNum === 0 ){
		return `오전 12시`;
	} else if( hourNum > 0 && hourNum <= 11 ) {
		return `오전 ${hourNum}시`;
	} else if( hourNum === 12 ) {
		return `오후 12시`;
	} else {
		return `오후 ${hourNum-12}시`
	}
}

// response data
//let currentData = {};
// 해당 날짜 데이터 전체를 감싸는 객체 (시간과 지역 정보가 포함)
//let currentDateData = {};

// 값을 덮어쓰기 위해 필요한 데이터
let currentDateObj = {};
let currentAllData = [];
//let currentTimeData = [];
//let currentHourObj = {};

// data 초기값 설정
let dateData = '';
let localArea = '경기도';
let hourData = document.getElementById("range-input").value;
document.getElementById("timeArea").innerHTML = printHour(hourData);
let dataId = '';
let celsiusData = 0;
let weatherCondition = '';
//let maximumTemperatureData = '';
//let minimumTemperatureData
let fineDustData = 0;
let ultraFineDustData = 0;
let windDirectionData = '';
let windSpeedData = 0;
let precipitationData = 0;
let relativeHumidity = 0;
// 삭제된 데이터
// let discomfortIndex = 0;
// let co2ConcentrationData = 0;
// let visibilityDistanceData = 0;

// 데이터가 이미 존재하는지 여부를 담은 변수
let hasDateData = false;
let hasLocalData = false;
let hasHourData = false;

// 현재 사용하지 않지만 혹시나 필요할까봐 주석 처리해둠 (기본 날짜 값을 현재 날짜 값으로 설정하는 함수)
// // 현재 날짜를 input 초기 value로 설정
// function setCurrentDate() {
//   // 현재 시간 데이터로 초기값 설정
//   const nowDateObj = new Date();
//   // 날짜만 할당
//   const nowYear = nowDateObj.getFullYear();
//   //console.log(nowYear);
//   document.getElementById("yearArea").innerHTML = String(nowYear);
//   const nowMonth = (nowDateObj.getMonth())+1;
//   //console.log(nowMonth);
//   document.getElementById("monthArea").innerHTML = String(nowMonth);
//   const nowDate = nowDateObj.getDate();
//   //console.log(nowDate);
//   document.getElementById("dayArea").innerHTML = String(nowDate);
//   document.getElementById("inputDateBox").value = `${nowDateObj.toISOString().slice(0, 10)}`;
// }



// Json 데이터를 받아옴
function getData( currentDate, currentHourData, currentLocalArea , displayInput) {
	hasDateData = false;
	hasLocalData = false;
	hasHourData = false;

	currentDateObj = {};
	currentAllData = [];
	currentTimeData = [];
	currentHourObj = {};

  // XMLHttpRequest 객체를 생성
  const xhttp = new XMLHttpRequest();

  // readystate property를 변경할 때 불려질 함수를 정의
  xhttp.onreadystatechange = function() {
    // readyState : XMLHttpRequest의 정의된 상태값
    // 0 : 요청이 초기화되지 않음
    // 1 : 서버 연결이 성립됨
    // 2 : 요청 전송됨
    // 3 : 요청 처리 중
    // 4 : 요청 완료 및 새로운 요청 대기
    // console.log("onready")

    // status : 요청 상태 정의 값
    // 200 : "OK"
    // 403 : "Forbidden" (서버가 허용하지 않는 웹 페이지나 미디어를 요청할 때 반환)
    // 404 : "Not Found"
    if(this.readyState == 4 && this.status == 200) {
      //console.log(this);
      //console.log("readyState")

      // responseText를 서버에서 받아와 일반 객체로 파싱
      let weatherInformation = JSON.parse(this.responseText);
      // console.log(weatherInformation);

      // 원하는 데이터 가져오기
      for(let dateObj of weatherInformation) {
        //console.log(dateObj.dateData);
        if ( dateObj.dateData === currentDate ) {
					hasDateData = true;
					currentDateObj = dateObj;
					//console.log("get : currentDateObj", currentDateObj);

          //console.log("get : 해당 날짜 데이터 존재");
          //console.log(dateObj.dateData);

          currentDateData = dateObj;
          //console.log("currentDateData : ", currentDateData);

          let currentAllData = dateObj.allData;
          for(let eachData of currentAllData) {
            if( eachData.localArea === currentLocalArea ) {
							hasLocalData = true;

              //console.log("get : 해당 날짜, 지역 데이터 존재");
              //console.log(eachData.localArea);

              let currentLocalData = eachData.timeData;
              for(let eachHourData of currentLocalData) {
                //console.log(eachHourData.hourData);

                if( eachHourData.hourData == currentHourData ) {
                  //console.log(typeof eachHourData.hourData);
                  //console.log(typeof currentHourData);
									hasHourData = true;

                  console.log("get : 해당 날짜, 지역, 시간 데이터 존재");
                  //console.log(eachHourData.hourData);
                  
                  // 데이터 할당
                  currentData = eachHourData;
                  hourData = eachHourData.hourData;
                  console.log(hourData);
                  dataId = eachHourData.id;
                  celsiusData = eachHourData.weatherData.celsiusData;
                  weatherCondition = eachHourData.weatherData.weatherCondition;
                  //maximumTemperatureData = eachHourData.weatherData.maximumTemperatureData;
                  //minimumTemperatureData = eachHourData.weatherData.minimumTemperatureData;
                  fineDustData = eachHourData.dustData.fineDustData;
                  ultraFineDustData = eachHourData.dustData.ultraFineDustData;
                  windDirectionData = eachHourData.windData.windDirectionData;
                  windSpeedData = eachHourData.windData.windSpeedData;
                  precipitationData = eachHourData.humidityData.precipitationData;
                  relativeHumidity = eachHourData.humidityData.relativeHumidity;
                  // 삭제된 데이터
									// visibilityDistanceData = eachHourData.etcData.visibilityDistanceData;
                  // discomfortIndex = eachHourData.etcData.discomfortIndex;
                  // co2ConcentrationData = eachHourData.etcData.co2ConcentrationData;

                }
              }
            }
          }

          // 해당 날짜, 시간, 지역의 데이터가 이미 존재한다면
          if(hasHourData) {
            // input value에 해당 값 뿌려주기
            // if(displayInput) {
            //   inputCelesiusDataBox.value = Number(celsiusData);
            //   document.getElementById("weatherConditionBox").value = weatherCondition;
            //   //inputMaximumTemperatureDataBox.value = Number(maximumTemperatureData);
            //   //inputMinimumTemperatureDataBox.value = Number(minimumTemperatureData);
            //   inputFineDustDataBox.value = Number(fineDustData);
            //   inputUltraFineDustDataBox.value = Number(ultraFineDustData);
            //   document.getElementById("WindDirBox").value = windDirectionData;
            //   inputWindSpeedDataBox.value = Number(windSpeedData);
            //   inputPrecipitationDataBox.value = Number(precipitationData);
            //   inputRelativeHumidityDataBox.value = Number(relativeHumidity);
            //   inputVisibilityDistanceDataBox.value = Number(visibilityDistanceData);
            //   inputco2ConcentrationDataBox.value = Number(co2ConcentrationData);

            //   runInputBox( inputCelesiusDataBox, inputFineDustDataBox, inputUltraFineDustDataBox, inputWindSpeedDataBox, inputPrecipitationDataBox, inputRelativeHumidityDataBox, inputco2ConcentrationDataBox, inputVisibilityDistanceDataBox);
            // }

            // 대시보드에 값 뿌리기
            // span으로 숫자 값만 바뀌고 단위는 고정되도록 수정 필요
            document.getElementById("yearArea").innerHTML = dateData.slice(0,4);
            document.getElementById("monthArea").innerHTML = dateData.slice(5,7);
            document.getElementById("dayArea").innerHTML = dateData.slice(8,10);
            document.getElementById("timeArea").innerHTML = printHour(hourData);
            console.log(hourData);
            
            document.getElementById("weatherCelArea").innerHTML = String(Math.floor(celsiusData));
            // 미세먼지 상태 값
            if( Number(fineDustData) >=0 && Number(fineDustData) <= 30 ){
              fineDustString = "좋음";
            } else if( Number(fineDustData) >=31 && Number(fineDustData) <= 80 ) {
              fineDustString = "보통";
            } else if( Number(fineDustData) >=81 && Number(fineDustData) <= 150 ) {
              fineDustString = "나쁨";
            } else if( Number(fineDustData) >=151 ) {
              fineDustString = "매우나쁨";
            }
            document.getElementById("fineDustConditionArea").innerHTML = fineDustString;
            document.getElementById("fineDustValueArea").innerHTML = String(Math.floor(fineDustData));
            // 초미세먼지 상태 값
            if( Number(ultraFineDustData) >=0 && Number(ultraFineDustData) <= 30 ){
              ultraFineDustString = "좋음";
            } else if( Number(ultraFineDustData) >=31 && Number(ultraFineDustData) <= 80 ) {
              ultraFineDustString = "보통";
            } else if( Number(ultraFineDustData) >=81 && Number(ultraFineDustData) <= 150 ) {
              ultraFineDustString = "나쁨";
            } else if( Number(ultraFineDustData) >=151 ) {
              ultraFineDustString = "매우나쁨";
            }
            document.getElementById("ultraDustConditionArea").innerHTML = ultraFineDustString;
						document.getElementById("ultraDustValueArea").innerHTML = String(Math.floor(ultraFineDustData));
            document.getElementById("windDirValueArea").innerHTML = windDirectionData;
            document.getElementById("windSpeedValueArea").innerHTML = String(Math.floor(windSpeedData));
            document.getElementById("pptnValueArea").innerHTML = String(Math.floor(precipitationData));
            document.getElementById("rhValueArea").innerHTML = String(Math.floor(relativeHumidity));
            // 삭제된 데이터
            //document.getElementById("maximumTemperaturePrintArea").innerHTML = maximumTemperatureData;
            //document.getElementById("minimumTemperaturePrintArea").innerHTML = minimumTemperatureData;
            // 삭제된 데이터
						// document.getElementById("visibilityDistanceValueArea").innerHTML = String(visibilityDistanceData.toFixed(1));
            // document.getElementById("discomfortIndexPrintArea").innerHTML = String(Math.floor(discomfortIndex));
            // document.getElementById("co2ConcentationPrintArea").innerHTML = String(co2ConcentrationData.toFixed(1));
          }
        }
      }
    }
  }

  // open(method, url, async, user, psw)
  // method : GET or POST
  // url : 파일의 위치
  // async : true(비동기) or false(동기)
  // user : 사용자 이름(옵션)
  // psw : 비밀번호(옵션)
  xhttp.open("GET", 'http://localhost:8888/weatherInformation/', false);
  // GET 방식을 사용하여 서버에 자료를 요청
  xhttp.send();
  //console.log("get : currentData", currentData);
}

// 날짜, 시간, 지역 설정하면 json data 가져오기
function onchangeData() {
  //console.log("dateData",dateData,"type:",typeof dateData);
  //console.log("hourData",hourData,"type:",typeof hourData);
  //console.log("localArea",localArea,"type:",typeof localArea);
  //console.log(Boolean(dateData && String(hourData) && localArea));

  if( dateData && String(hourData) && localArea ) {
    //console.log("날짜, 시간, 지역 설정 값 다 있음");
    getData(dateData, hourData, localArea, true);

    // inputCelesiusDataBox.value = Number(celsiusData);
    // document.getElementById("weatherConditionBox").value = weatherCondition;
    // //inputMaximumTemperatureDataBox.value = Number(maximumTemperatureData);
    // //inputMinimumTemperatureDataBox.value = Number(minimumTemperatureData);
    // inputFineDustDataBox.value = Number(fineDustData);
    // inputUltraFineDustDataBox.value = Number(ultraFineDustData);
    // document.getElementById("WindDirBox").value = windDirectionData;
    // inputWindSpeedDataBox.value = Number(windSpeedData);
    // inputPrecipitationDataBox.value = Number(precipitationData);
    // inputRelativeHumidityDataBox.value = Number(relativeHumidity);
		// inputVisibilityDistanceDataBox.value = Number(visibilityDistanceData);
    // inputco2ConcentrationDataBox.value = Number(co2ConcentrationData);

    // runInputBox( inputCelesiusDataBox, inputFineDustDataBox, inputUltraFineDustDataBox, inputWindSpeedDataBox, inputPrecipitationDataBox, inputRelativeHumidityDataBox, inputco2ConcentrationDataBox, inputVisibilityDistanceDataBox);

    // intervalRender();

  }
}

function deleteDateData(id) {
  //console.log("delete");
  //console.log(id);
  const xhttp = new XMLHttpRequest();
  //currentDateObj.id
  xhttp.open('DELETE', 'http://localhost:8888/weatherInformation/'+id);
  
  // jsonObj를 문자열로 변환해 서버에 전송
  xhttp.send();
}

function postData(){
  // post
  //console.log("post");
  innerId = dateData.replace(/-/g, "") + ( String(hourData).length === 1 ? "0"+String(hourData) : String(hourData) ) + localArea;

  jsonObj = {
    "id": dateData.replace(/-/g, ""),
    dateData,
    "allData": [
      {
        localArea,
        "timeData": [
          {
            innerId,
            hourData,
            "weatherData": {
              celsiusData,
              weatherCondition
              //maximumTemperatureData,
              //minimumTemperatureData
            },
            "dustData": {
              fineDustData,
              ultraFineDustData
            },
            "windData": {
              windDirectionData,
              windSpeedData
            },
            "humidityData": {
              precipitationData,
              relativeHumidity
            },
            // 삭제된 데이터
            // "etcData": {
            //   visibilityDistanceData,
            //   discomfortIndex,
            //   co2ConcentrationData
            // }
          }
        ]
      }
    ]
  }
  //console.log(jsonObj);
	 
	postObj = {};

	if( hasDateData ) {
		if( hasLocalData ) {
			if( hasHourData ) {
				// 해당 날짜, 지역, 시간의 데이터가 존재
				//console.log("post : 해당 날짜, 지역, 시간의 데이터가 존재");
        //console.log(celsiusData);

        newObj = {
          innerId,
          hourData,
          "weatherData": {
            celsiusData,
            weatherCondition
          },
          "dustData": {
            fineDustData,
            ultraFineDustData
          },
          "windData": {
            windDirectionData,
            windSpeedData
          },
          "humidityData": {
            precipitationData,
            relativeHumidity
          },
          // 삭제된 데이터
          // "etcData": {
          //   visibilityDistanceData,
          //   discomfortIndex,
          //   co2ConcentrationData
          // }
        }
        
        postObj = currentDateObj;
        for(eachData of postObj.allData) {
          if(eachData.localArea === localArea) {
            //console.log("if 1");
            for(eachHourObj of eachData.timeData) {
              if(eachHourObj.hourData === hourData) {
                //console.log("if 2");
                //console.log("eachHourObj", eachHourObj);

                // 해당 시간 데이터의 속성을 업데이트
                eachHourObj.innerId = innerId;
                eachHourObj.hourData = hourData;
                eachHourObj.weatherData = {
                    celsiusData,
                    weatherCondition
                };
                eachHourObj.dustData = {
                    fineDustData,
                    ultraFineDustData
                };
                eachHourObj.windData = {
                    windDirectionData,
                    windSpeedData
                };
                eachHourObj.humidityData = {
                    precipitationData,
                    relativeHumidity
                };
                // 삭제된 데이터
                // eachHourObj.etcData = {
                //     visibilityDistanceData,
                //     discomfortIndex,
                //     co2ConcentrationData
                // };
                
              }
            }
          }
        }
        //console.log("newObj",newObj);
        //console.log("postObj",postObj);

        deleteDateData();

			} else {
				// 해당 날짜, 지역의 데이터만 존재
				//console.log("post : 해당 날짜, 지역의 데이터가 존재");

        let newObj = {
          innerId,
          hourData,
          "weatherData": {
            celsiusData,
            weatherCondition
          },
          "dustData": {
            fineDustData,
            ultraFineDustData
          },
          "windData": {
            windDirectionData,
            windSpeedData
          },
          "humidityData": {
            precipitationData,
            relativeHumidity
          },
          // 삭제된 데이터
          // "etcData": {
          //   visibilityDistanceData,
          //   discomfortIndex,
          //   co2ConcentrationData
          // }
        }
  
        postObj = currentDateObj;
        for(eachData of postObj.allData) {
          if(eachData.localArea === localArea) {
            eachData.timeData.push( newObj );
          }
        }
  
        deleteDateData();
			}

		} else {
			// 해당 날짜 데이터만 존재
			//console.log("post : 해당 날짜 데이터만 존재");

		  let newObj = {
        localArea,
        "tiemData": [
          {
            innerId,
            hourData,
            "weatherData": {
              celsiusData,
              weatherCondition
            },
            "dustData": {
              fineDustData,
              ultraFineDustData
            },
            "windData": {
              windDirectionData,
              windSpeedData
            },
            "humidityData": {
              precipitationData,
              relativeHumidity
            },
            // 삭제된 데이터
            // "etcData": {
            //   visibilityDistanceData,
            //   discomfortIndex,
            //   co2ConcentrationData
            // }
          }
        ]
      }

      postObj = currentDateObj;
      postObj.allData.push(newObj);

      deleteDateData();

		}
	} else {
		// 해당 날짜 데이터가 존재하지 않음
		//console.log("post : 해당 날짜 데이터가 존재하지 않음");
		postObj = jsonObj;
	}

  const xhttp = new XMLHttpRequest();
  xhttp.open('POST', 'http://localhost:8888/weatherInformation/');
  // jsonObj를 문자열로 변환해 서버에 전송
  xhttp.send(JSON.stringify( postObj ));
}

document.getElementById("inputDateBox").addEventListener("change", (e)=>{
  dateData = e.target.value;
  //console.log(dateData);
  onchangeData();
  document.getElementById("yearArea").innerHTML = e.target.value.slice(0,4);
  document.getElementById("monthArea").innerHTML = e.target.value.slice(5,7);
  document.getElementById("dayArea").innerHTML = e.target.value.slice(8,10);

});

document.getElementById("range-input").addEventListener("change", (e)=>{
  // 시간 맨 처음 페이지 로드 됐을 때 기본 value값 설정 필요
  hourData = parseInt(e.target.value);
  //console.log(hourData);
  onchangeData();
  let printString = '';

  if( e.target.value == 0 ) {
    printString = "오전 12시";
  } else if( e.target.value > 0 && e.target.value <= 11 ) {
    printString = "오전 " + String(e.target.value) + "시";
  } else if( e.target.value == 12 ) {
    printString = "오후 12시"
  } else {
    printString = "오후 " + String(e.target.value - 12) + "시";
  }
  document.getElementById("timeArea").innerHTML = printString;
});

document.getElementById("optionList").addEventListener("click", (e)=>{
  localArea = e.target.innerHTML;
  //console.log(localArea);
  onchangeData();  
  document.getElementById("localArea").innerHTML = e.target.innerHTML;
});

document.getElementById("submitBtn").addEventListener("click", ()=> {
	
	//console.log("클릭이벤트");
  // hourData = eachHourData.hourData;
  // dataId = eachHourData.id;
  celsiusData = inputCelesiusDataBox.value;
  //console.log(inputCelesiusDataBox.value);
  weatherCondition = document.getElementById("weatherConditionBox").value;
  //maximumTemperatureData = inputMaximumTemperatureDataBox.value;
  //minimumTemperatureData = inputMinimumTemperatureDataBox.value;
  fineDustData = inputFineDustDataBox.value;
  ultraFineDustData = inputUltraFineDustDataBox.value;
  windDirectionData = document.getElementById("WindDirBox").value;
  windSpeedData = inputWindSpeedDataBox.value;
  precipitationData = inputPrecipitationDataBox.value;
  relativeHumidity = inputRelativeHumidityDataBox.value;
  // 삭제된 데이터
	// visibilityDistanceData = inputVisibilityDistanceDataBox.value;
	// 불쾌지수 산출
	// discomfortIndex = (0.81	* celsiusData + 0.01 * relativeHumidity * ( 0.99 * celsiusData  - 14.3 ) + 46.3 );
	// discomfortIndex *= 100;
	// discomfortIndex = Math.floor(discomfortIndex);
	// discomfortIndex = discomfortIndex / 100;
  // co2ConcentrationData = inputco2ConcentrationDataBox.value;

	
	postData();

  setTimeout(()=>{getData(dateData, hourData, localArea, false);},1000)
});

// 데이터 담기 클래스 -> 현재 미사용
class DataStructure{
  constructor( constId ){
    this.constId = constId;
    this._array = [];
  }

  pushItem( item ){
    this._array.push( item );    
  }

  get dataLength(){
    return this._array.length;
  }

  get dataArray(){
    return this._array;
  }

}

/// 인풋넘버박스 class
class OriginNumBox{
  constructor( inputName, inputNameKor, minNum, maxNum ){
    this.inputId = inputName + "Box"; /// 넘버박스 아이디
    this.inputName = inputName; /// inputName
    this.inputNameKor = inputNameKor; /// 한글표기
    this._element = null; /// DOM 객체
    this.displayElement = document.getElementById(inputName+"BoxArea"); /// 부모 DOM 객체
    this.maxNum = maxNum; /// 최대값
    this.minNum = minNum; /// 최소값
    this._value = 0; /// 밸류값
  }

  /// 박스 시각화 메소드
  visualizeNumBox(){
    let printString = "";
    printString += `<span>${this.inputNameKor}</span> <input id="${this.inputId}"type="number" name="${this.inputName}" value="${this._value}"></input>`;
    (this.displayElement).innerHTML = printString;

    /// 시각화된 객체자신의 DOM 요소 가져오기
    this._element = document.getElementById(this.inputId);
    //console.log(this);
  }
  changeValue(){
    this._element.addEventListener("change", (e)=>{
      ///console.log(e.target.value);

      /// 각 인풋의 입력 범위
      if( parseInt(e.target.value) < this.minNum ){
        e.target.value = String( this.minNum );
      }else if( parseInt(e.target.value) > this.maxNum ){
        e.target.value = String( this.maxNum );
      }else if(/\./.test(e.target.value)){
        e.target.value = String( Math.floor( parseFloat( e.target.value ) ) );
      }else if( e.target.value === '' ){
        e.target.value = '0';
      }

      this._value = parseInt( e.target.value );

      this.visualizeNumBox();
      //console.log(this);
      this.changeValue();
    });
  }

  get value(){
    return this._value;
  }
  set value( inputValue){
    this._value = inputValue;
  }
}

/********** 변수 선언 **********************/
const weatherInformation = new DataStructure("weatherInformation");
//weatherInformation.getData("2024-03-02", "지역1", "0");

/// 인풋 넘버박스 객체
const inputCelesiusDataBox = new OriginNumBox( "celesiusData", "현재기온", -30, 40 ); /// 현재기온값 입력박스
const inputFineDustDataBox = new OriginNumBox( "fineDustData", "미세먼지", 0, 170 ); /// 미세먼지값 입력박스
const inputUltraFineDustDataBox = new OriginNumBox( "ultraFineDustData", "초미세먼지", 0, 100 ); /// 초미세먼지값 입력박스
const inputWindSpeedDataBox = new OriginNumBox( "windSpeedData", "풍속", 0, 50 ); /// 풍속값 입력박스
const inputPrecipitationDataBox = new OriginNumBox( "precipitationData", "강수량", 0, 100 ); /// 강수량값 입력박스
const inputRelativeHumidityDataBox = new OriginNumBox( "relativeHumidityData", "습도", 0, 100 ); /// 습도값 입력 박스
// const inputco2ConcentrationDataBox = new OriginNumBox( "co2ConcentrationData", "이산화탄소", 0, 900 ); /// 이산화 농도 입력 박스
// const inputVisibilityDistanceDataBox = new OriginNumBox( "visibilityDistanceData", "시정거리", 0, 900 ); /// 안개 시정거리 입력

/***** 함수 선언 ******/

/// 인풋 넘버박스 초기값 랜덤주기 함수
//const randomValue = (minValue, maxValue) => {
////  return Math.floor( Math.random() * ( maxValue - minValue + 1 ) ) + minValue;
//}

/// 인풋 넘버박스 실행 함수
const runInputBox = (...rest) => {
  rest.forEach(( inputItem )=>{
    inputItem.visualizeNumBox();
  });

  rest.forEach(( inputItem )=>{
    inputItem.changeValue();
  });
}

/// 인풋박스의 맨 처음 입력값 랜덤 생성
// inputCelesiusDataBox.value = randomValue(7, 12);
// inputFineDustDataBox.value = randomValue(20, 33);
// inputUltraFineDustDataBox.value = randomValue(10, 30);
// inputWindSpeedDataBox.value = randomValue(5, 10);
// inputPrecipitationDataBox.value = randomValue(5, 20);
// inputRelativeHumidityDataBox.value = randomValue(20, 36);
// inputco2ConcentrationDataBox.value = randomValue(100, 200);
// inputVisibilityDistanceDataBox.value = randomValue(30, 340);


/// 인풋박스 실행
runInputBox( inputCelesiusDataBox, inputFineDustDataBox, inputUltraFineDustDataBox, inputWindSpeedDataBox, inputPrecipitationDataBox, inputRelativeHumidityDataBox
  // , inputco2ConcentrationDataBox, inputVisibilityDistanceDataBox
);

/// 초기화 버튼 이벤트
document.getElementById("resetBtn").addEventListener("click", ()=>{
  ///인풋넘버 입력값 초기화
  inputCelesiusDataBox.value = '0';
  inputFineDustDataBox.value = '0';
  inputUltraFineDustDataBox.value = '0';
  inputWindSpeedDataBox.value = '0';
  inputPrecipitationDataBox.value = '0';
  inputRelativeHumidityDataBox.value = '0';
  // inputco2ConcentrationDataBox.value = '0';
  // inputVisibilityDistanceDataBox.value = '0';
  
  /// 인풋박스 시각화 & 체인지 이벤트 재실행
  runInputBox( inputCelesiusDataBox, inputFineDustDataBox, inputUltraFineDustDataBox, inputWindSpeedDataBox, inputPrecipitationDataBox, inputRelativeHumidityDataBox
    // , inputco2ConcentrationDataBox, inputVisibilityDistanceDataBox
  );
});

function setData() {
  //console.log("setData 실행");
  const nowDate = new Date();
  dateData = nowDate.toISOString().slice(0,10);
  const currentMonth = nowDate.getMonth();

  let timeDataArray = [];

  let highTemp = temperaturesGroup[localArea][currentMonth][0];
  let lowTemp = temperaturesGroup[localArea][currentMonth][1];
  let tempTemp = lowTemp;

  deleteDateData(dateData.replace(/-/g, ""));

  // 초기값 설정
  weatherCondition = "맑음";
  fineDustData = 40;
  ultraFineDustData = 22;
  windDirectionData = "동북동";
  windSpeedData = 3;
  precipitationData = 50;
  relativeHumidity = 70;
  // visibilityDistanceData = 39.9;
  // discomfortIndex = (0.81	* celsiusData + 0.01 * relativeHumidity * ( 0.99 * celsiusData  - 14.3 ) + 46.3 );
	// discomfortIndex *= 100;
	// discomfortIndex = Math.floor(discomfortIndex);
	// discomfortIndex = discomfortIndex / 100;
  // co2ConcentrationData = 151;
  const rainWaveGraph = new RainWave("rainWaveGraph1", inputValue, precipitationData);
  for(i=0; i<24; i++) {
    let dotValue = (highTemp - lowTemp) / 12;
    i < 12? tempTemp += dotValue : tempTemp -= dotValue;
  
    hourData = i;
    innerId = dateData.replace(/-/g, "") + ( String(hourData).length === 1 ? "0"+String(hourData) : String(hourData) ) + localArea;

    newObj = {
      innerId,
      hourData,
      "weatherData": {
        "celsiusData": Math.floor(tempTemp),
        weatherCondition
        //maximumTemperatureData,
        //minimumTemperatureData
      },
      "dustData": {
        fineDustData,
        ultraFineDustData
      },
      "windData": {
        windDirectionData,
        windSpeedData
      },
      "humidityData": {
        precipitationData,
        relativeHumidity
      },
      // "etcData": {
      //   visibilityDistanceData,
      //   discomfortIndex,
      //   co2ConcentrationData
      // }
    }

    timeDataArray.push(newObj);
  }

  postObj = {
    "id": dateData.replace(/-/g, ""),
    dateData,
    "allData": [
      {
        localArea,
        "timeData": timeDataArray
      }
    ]
  }

  // post
  const xhttp = new XMLHttpRequest();
  xhttp.open('POST', 'http://localhost:8888/weatherInformation/');
  // jsonObj를 문자열로 변환해 서버에 전송
  xhttp.send(JSON.stringify( postObj ));
 function setup() {
        rainWave.setup();
    }

    function draw() {
        rainWave.draw();
    }
}

setData();
hourData = 0;

function displayInterval() {
  if(hourData < 24) {
    setTimeout(()=>{
      getData(dateData, hourData, localArea, false);
      hourData++;
      displayInterval();
    }, 1000);
  } else {
    hourData = 0;
    displayInterval();
  }
}

displayInterval();





// function intervalRender() {

//   function postInterval() {
//     deleteDateData();
  
//     innerId = dateData.replace(/-/g, "") + ( String(hourData).length === 1 ? "0"+String(hourData) : String(hourData) ) + localArea;
  
//     jsonObj = {
//       "id": dateData.replace(/-/g, ""),
//       dateData,
//       "allData": [
//         {
//           localArea,
//           "timeData": [
//             {
//               innerId,
//               hourData,
//               "weatherData": {
//                 "celsiusData": tempTemp,
//                 weatherCondition
//                 //maximumTemperatureData,
//                 //minimumTemperatureData
//               },
//               "dustData": {
//                 fineDustData,
//                 ultraFineDustData
//               },
//               "windData": {
//                 windDirectionData,
//                 windSpeedData
//               },
//               "humidityData": {
//                 precipitationData,
//                 relativeHumidity
//               },
//               "etcData": {
//                 visibilityDistanceData,
//                 discomfortIndex,
//                 co2ConcentrationData
//               }
//             }
//           ]
//         }
//       ]
//     }
//     //console.log(jsonObj);
  
//     const xhttp = new XMLHttpRequest();
//     xhttp.open('POST', 'http://localhost:8888/weatherInformation/');
//     // jsonObj를 문자열로 변환해 서버에 전송
//     xhttp.send(JSON.stringify( jsonObj ));
  
//     hourData++;

//     if(hourData == 23) {

//     }
//   }
  
//   let currentDate = new Date(dateData);
//   let currentMonth = currentDate.getMonth();

//   let highTemp = temperaturesGroup[localArea][currentMonth][0];
//   //console.log("highTemp: ", highTemp);
//   let lowTemp = temperaturesGroup[localArea][currentMonth][1];
//   //console.log("lowTemp: ", lowTemp);

//   let tempTemp = lowTemp;

//   for(let i=0; i<24; i++){
//     let dotValue = (highTemp - lowTemp)/ 12;
//     //console.log(`${i}시: ${tempTemp}`);
//     i < 12? tempTemp += dotValue : tempTemp -= dotValue;
//   }
  
// }

