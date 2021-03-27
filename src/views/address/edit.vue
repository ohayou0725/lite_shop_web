<template>
  <div class="address-edit">
    <nav-bar :title="`${type === 1 ? '新增' : '编辑'}地址`" />

    <van-address-edit
      :address-info="addressInfo"
      :area-list="areaList"
      show-postal
      :show-delete="type === 2"
      show-set-default
      show-search-result
      :is-saving="isSaving"
      :is-deleting="isDeleting"
      :save-button-text="`${type === 1 ? '保存' : '更新'}`"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import areaList from "@/utils/area.js";
import {
  addAddress,
  deleteAddress,
  updateAddress,
  getAddress,
} from "@/api/user";
import { nanoid } from "nanoid";

export default {
  name: "AddressEdit",
  components: {
    NavBar,
  },
  data() {
    return {
      type: 1, // 1-新增 2-编辑
      isSaving: false,
      isDeleting: false,
      areaList,
      addressInfo: {},
    };
  },
  mounted() {
    const { type, id } = this.$route.query;
    this.type = Number(type);
    if (this.type === 2) {
      this.getAddressInfo(id);
    }
  },
  methods: {
    // 获取地址信息
    getAddressInfo(id) {
      this.$toast.loading("加载中...");
      getAddress(id).then((res) => {
        const data = res.data.detail;
        this.addressInfo = {
          addressId: data.addressId,
          name: data.receiver,
          tel: data.receiverMobile,
          postalCode: data.postalCode,
          addressDetail: data.address,
          isDefault: data.defaultAddress,
          areaCode: data.areaCode,
        };
        this.$toast.clear();
      });
    },
    // 新增or更新
    onSave(address) {
      console.log(address)
      this.isSaving = true;
      let data = {
        addressId : address.addressId,
        receiver: address.name,
        receiverMobile: address.tel,
        area: address.province + address.city + address.county,
        postalCode: address.postalCode,
        address: address.addressDetail,
        defaultAddress: address.isDefault,
        areaCode: address.areaCode,
      };
      if (this.type === 1) {
        addAddress(data).then((res) => {
          if (res.success) {
            this.isSaving = false;
            this.$notify({
              type: "success",
              message: "保存成功",
              duration: 2000,
              onOpened: () => {
                this.$router.back();
              },
            });
          }
        });
        this.isSaving = false;
      } else {
        updateAddress(
          data,
        ).then((res) => {
          this.isSaving = false;
          this.$notify({
            type: "success",
            message: "更新成功",
            duration: 2000,
            onOpened: () => {
              this.$router.back();
            },
          });
        });
      }
    },
    // 删除地址
    onDelete(address) {
      deleteAddress(
        address.addressId
      ).then((res) => {
        this.isSaving = false;
        this.$notify({
          type: "success",
          message: "删除成功",
          duration: 2000,
          onOpened: () => {
            this.$router.back();
          },
        });
      });
    },
  },
};
</script>

<style>
</style>
