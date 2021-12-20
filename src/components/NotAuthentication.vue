<template>
  <v-container>
    <v-row color="white" class="my_row">
      <v-col sm="12" md="6" cols="12" class="screen_small pr-0" style="padding-right: 0px !important;">
        <v-card
          color="white"
          class="pa-10 rounded-0 no_border card_left"
          height="365px"

        >
          <h1 style="font-size: 60px; letter-spacing: -4px;" class="mb-6 line_40">{{ $t("please_sign_in") }}</h1>
        <h1 class="mb-6 to_access">{{ $t("to_access_banhji_financial") }}</h1>
          <v-row>
            <v-col cols="6" sm="5">
                <v-btn
                color="primary"
                @click="Login"
                class="btn rounded-pill btn_signup nextBtn "
                style="width: 100%; font-size: 18px; height: 50px !important; background: #ED1A3A !important"
                >{{ $t("sign_in") }}
                </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col sm="12" md="6" cols="12" class="screen_small3 pl-0" style="padding-left: 0px !important;">
        <v-card
          color="primary"
          class="pa-10 rounded-0 no_border card_right"
          min-height="365px"
        >
          <a class="float-left mb-2" href="https://www.banhji.com/">
            <img class="img_center" src="@/assets/images/banhji-logo-r.png" />
          </a>
          <h1 class="white--text font_40 float-left text-truly mb-2">
            {{ $t("a_truly_modern") }}
          </h1>
          <p class="mb-0 float-left line_20 that_also">
            {{ $t("that_also_does") }}
          </p>
        </v-card>
      </v-col>
      <v-col cols="12" style="position: relative;">
          <div class="footer text-center">
         
                  <p class="font_13"
                    >&copy; {{ year }} {{ $t("footer_desc") }}</p
                  >
          
          </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    year: new Date().getFullYear(),
  }),
  methods: {
    Login() {
      if (process.env.VUE_APP_MODE == "dev") {
        window.location.href = "http://localhost:8080/";
      } else {
        window.location.href = "https://connect.banhji.com/";
      }
    },
  },
};
</script>

<style scoped>
.link_app {
  display: block;
  padding: 10px;
}
.card_left{
    height: 365px;
    min-height: 365px;
    background: #fff !important;
    padding: 40px;
}
.card_right{
    height: 365px;
    min-height: 365px;
    background: #ed1a3a !important;
    padding: 40px;
}

.v-btn--outlined {
  border: thin solid #d6d6d6 !important;
}

.link_app:hover {
  background: rgb(226, 226, 226);
}

.stepwizard-step p {
  margin-top: 10px;
}

.stepwizard-row {
  display: table-row;
}
.text-center{
  text-align: center;
}


.stepwizard {
  display: table;
  width: 100%;
  position: relative;
}
.mb-6{
  margin-bottom: 24px;
}

.stepwizard-step button[disabled] {
  opacity: 1 !important;
  filter: alpha(opacity=100) !important;
}

.stepwizard-step {
  display: table-cell;
  text-align: center;
  position: relative;
}

p{
  font-family: 'Niradei-Regular';
}
.btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 2px 0;
  font-size: 20px;
  line-height: 1.428571429;
  border-radius: 15px;
  font-weight: 700;
  background-color: #000;
  color: #fff;
}

.btn-circle p {
  color: #000;
  font-size: 25px;
  font-weight: 700;
  float: left;
  text-align: left;
  position: absolute;
  top: -3px;
  right: 0;
  margin-top: 0;
}

.btn-primary p {
  color: #007bff;
}

.btn-circle.btn-primary {
  background-color: #007bff !important;
}

.img_center {
  height: 70px;
}
.my_row {
  margin-top: 11% !important;
}
@media (max-width: 768px) {
  .screen_small {
    margin-top: 0px;
  }
  .screen_small3 {
    margin-top: 60px;
  }
  .my_row {
    margin-top: 4% !important;
  }
}
.footer {
  color: #333;
  font-size: 16px;
  height: auto;
  float: left;
  width: 80%;
  position: fixed;
  bottom: 0;
  padding: 15px 0;
}
 .text-truly {
    width: 80%;
    line-height: 40px;
    font-size: 36px;
    color: #fff;
}

@media (max-width: 768px) {
  .footer {
    color: #333;
    font-size: 16px;
    height: auto;
    float: left;
    width: 100%;
    position: relative;
    bottom: 0;
    padding: 15px 0;
  }
  .text_pwd {
    line-height: 11px !important;
  }
}
@media (max-width: 992px) {
  .screen_small {
    padding-left: 15px !important;
    padding-right: 15px !important;
  }
  .text-that-also {
    font-size: 18px;
    width: 100% !important;
    line-height: 25px;
  }
  .text_pwd {
    line-height: 11px !important;
  }
  .screen_small2 {
    margin-top: 200px !important;
  }
  .text-truly {
    width: 100%;
  }
}
@media (max-width: 1030px) {
  .text-that-also {
    font-size: 18px;
    width: 100% !important;
    line-height: 25px;
  }
  .text-truly {
    width: 100%;
  }
  .text_pwd {
    line-height: 11px !important;
  }
}
.line_13 {
  line-height: 13px;
}
.line_40{
    line-height: 40px;
}
.to_access{
    font-size: 40px;
    line-height: 49px;
    font-family: "Niradei-Light", serif !important;
}
.that_also{
    font-size: 21px;
    color: #fff;
    line-height: 26px;
    font-family: 'Niradei-Light';
}
</style>
