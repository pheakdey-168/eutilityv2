<template>
  <v-row class="">
    <!-- <v-col sm="10" cols="12" class="pt-0">
      <h2 class="mb-0 font_20">{{ $t("supplier_directory") }}</h2>
      <p class="mb-0">
        {{ $t("supplier_directory_desc") }}
      </p>
    </v-col> -->
    <v-col sm="12" cols="12" class="pt-4">
      <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
          <v-row class="">
            <v-col sm="4" cols="12" class="py-0">
              <v-text-field
                class="mt-1"
                v-model="search"
                @keypress.enter="onSearch(search)"
                @click:clear="onSearch('')"
                clearable
                :placeholder="$t('search_directory')"
                outlined
              />
            </v-col>
            <v-col sm="2" cols="12" class="py-1">
              <v-btn
                color="primary"
                class="white--text capitalize marginTopPhone"
                @click="onSearch(search)"
              >
                {{ $t("search") }}
              </v-btn>
            </v-col>
            <v-col sm="6" cols="12" class="py-1">
              <v-btn
                  color="primary"
                  class="float-right white--text capitalize ml-2"
                  to="individual_supplier"
              >{{ $t("add_individual_supplier") }}
              </v-btn>
              <!-- <v-btn outlined class="primary--text mx-3 capitalize float-right">
                {{ $t("import") }}
              </v-btn> -->
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="">
        <v-col sm="12" cols="12" class="py-0">
          <kendo-datasource
            ref="dataSourceSupply"
            :data="supplierDirectory"
            :page-size="100"
          />
          <kendo-grid
            id="gridSDirectory"
            class="grid-function"
            :data-source-ref="'dataSourceSupply'"
            :editable="false"
            :pageable="true"
            :pageable-refresh="true"
            :column-menu="true"
            :groupable="true"
          >
            <kendo-grid-column
              :width="150"
              :field="'number'"
              :title="$t('number')"
              :template="'<span>#= abbr #-#= number#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :width="150"
              :field="'name'"
              :title="$t('name')"
              :template="'<span>#= name#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :width="120"
              :field="'phoneNumber'"
              :title="$t('phone')"
              :template="'<span>#= phoneNumber#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :width="200"
              :field="'email'"
              :title="$t('email')"
              :hidden="true"
              :template="'<span>#= email#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :width="120"
              :field="'type'"
              :title="$t('type')"
              :template="
                '<span>#= type#</span>'
              "
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :width="100"
              :field="'priceLevel'"
              :title="$t('price_level')"
              :hidden="true"
              :template="'<span>#= priceLevel.name#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <!-- <kendo-grid-column
              :width="200"
              :field="'paymentOption'"
              :hidden="true"
              :title="$t('payment_option')"
              :template="'<span>#= paymentOption.name#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            /> -->
            <kendo-grid-column
              :width="200"
              :field="'sAccountPayable'"
              :hidden="true"
              :title="$t('account_payable')"
              :template="'<span>#= sAccountPayable.name#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :width="200"
              :field="'sPurchaseDeposit'"
              :hidden="true"
              :title="$t('purchase_deposit')"
              :template="'<span>#= sPurchaseDeposit.name#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :width="200"
              :field="'sPurchaseDiscountAcc'"
              :hidden="true"
              :title="$t('settlement_discount')"
              :template="'<span>#= sPurchaseDiscountAcc.name#</span>'"
              :headerAttributes="{ style: 'background-color: #EDF1F5' }"
            />
            <kendo-grid-column
              :field="''"
              :title="$t('action')"
              :width="80"
              :visible="true"
              :command="[
                { iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit },
              ]"
              :headerAttributes="{
                style: 'text-align: right; background-color: #EDF1F5',
              }"
              :attributes="{ style: 'text-align: right' }"
            />
          </kendo-grid>
          <!-- <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{ $t('name') }}</th>
                                    <th>{{ $t('phone') }}</th>
                                    <th>{{ $t('email') }}</th>
                                    <th>{{ $t('type') }}</th>
                                    <th>{{ $t('status') }}</th>
                                    <th>{{ $t('group') }}</th>
                                    <th>{{ $t('action') }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="tb_name_td">Me</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class="text-center">
                                        <v-btn class="bg-none">
                                            <v-icon size="17px" class="primary--text">fa fa-eye</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template> -->
          <LoadingMe
            :isLoading="showLoading"
            :fullPage="true"
            :myLoading="true"
            type="loading"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import kendo from "@progress/kendo-ui";

const customerHandler = require("@/scripts/customerHandler");
export default {
  data: () => ({
    showLoading: false,
    start_date: "",
    end_date: "",
    supplierDirectory: "",
    search: "",
    params: {
      search: "",
      type: "sup-",
    },
    group: {},
  }),
  props: {},
  methods: {
    async loadSupplierDirectory() {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve("resolved");
          this.showLoading = true;
          customerHandler.directory(this.params).then((res) => {
            this.showLoading = true;
            if (res.data.statusCode === 200) {
              this.showLoading = false;
              this.supplierDirectory = res.data.data;
            }
          });
        }, 300);
      });
    },
    onSearch(search) {
      this.params = {
        search: search,
        type: "sup-",
      };
      this.loadSupplierDirectory();
    },
    goEdit(e) {
      e.preventDefault();
      let grid = kendo.jQuery("#gridSDirectory").data("kendoGrid");
      let dataItem = grid.dataItem(kendo.jQuery(e.currentTarget).closest("tr"));
      if (dataItem.type === "Individual") {
        this.$router.push({
          path: "individual_supplier" + `/${dataItem.id}`,
          params: { id: dataItem.id },
          query: { type: "edit" },
        });
      } else {
        this.$router.push({
          path: "company_supplier" + `/${dataItem.id}`,
          params: { id: dataItem.id },
          query: { type: "edit" },
        });
      }
    },
  },
  async mounted() {
    await this.loadSupplierDirectory();
  },
  computed: {},
  components: {
    LoadingMe: LoadingMe,
  },
  watch: {
    $route: "loadSupplierDirectory",
  },
};
</script>
<style scoped>
.acc_group header {
  height: 10px !important;
}

table.acc_group tr td {
  border-bottom: 1px solid #ccc;
  padding: 8px;
  vertical-align: middle;
}

table.acc_group tr td:first-child {
  font-weight: 700;
}

table.acc_group tr td:last-child {
  text-align: center;
}

.v-card__actions .v-btn.v-btn {
  padding: 0 16px;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > th {
  font-family: "Niradei-Bold", serif;
  color: #000 !important;
  border-top: 1px solid #000 !important;
  border-bottom: 1px solid #000 !important;
  font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > thead
  > tr
  > td {
  color: #000 !important;
  padding: 5px !important;
}

.exchange-table.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:last-child
  td {
  border-bottom: 1px solid #000 !important;
}

.function_footer {
  padding: 15px;
  display: inline-block;
}

p {
  color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
  height: 47.2px !important;
}

.text_tip {
  font-size: 9px;
  line-height: 10px;
}

@media (max-width: 576px) {
  .marginTopPhone {
    margin-top: -10px;
  }
}
</style>
