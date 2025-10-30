sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/ui/model/json/JSONModel",
  "sap/gantt/misc/Format",
  "sap/gantt/misc/Utility",
  "sap/ui/core/BusyIndicator",
  "sap/ui/core/theming/Parameters",
  "sap/gantt/config/TimeHorizon",
  "sap/gantt/axistime/ProportionZoomStrategy",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageBox",
  "sap/m/MessageToast",
  "sap/ui/Device",
  "sap/m/Popover",
  "sap/m/Button",
  "sap/m/library"
], function(
  Controller,
  Fragment,
  JSONModel,
  Format,
  Utility,
  BusyIndicator,
  Parameters,
  TimeHorizon,
  ProportionZoomStrategy,
  Filter,
  FilterOperator,
  MessageBox,
  MessageToast,
  Device,
  Popover,
  Button,
  mobileLibrary
) {
  "use strict";
  return Controller.extend("sierra.pra.PRA_Custom.controller.collective_doi", {
    onInit: function() {
      var that = this;
      this.globalModel = this.getOwnerComponent().getModel("globalModel");
      var oModel = new JSONModel(this.globalModel);
      oModel.setSizeLimit(500);
      this.getView().setModel(oModel, "oModel");
      this.getOwnerComponent().getModel().read("/venture_doiSet", {
        success: function(data, response) {
          that.globalModel.DOI = [];
          that.globalModel.ventureList2 = data.results;
          for (var i = 0; i < that.globalModel.ventureList2.length; i++) {
            that.globalModel.DOI.push(that.globalModel.ventureList2[i]);
          }
          that.getView().getModel("oModel").refresh();
        },
        error: function(err) {
          // handle error
        }
      });
      this.getOwnerComponent().getModel().read("/DOI_OWNERSet", {
        success: function(data, response) {
          that.globalModel.DOI2 = [];
          that.globalModel.ventureList3 = data.results;
          for (var i = 0; i < that.globalModel.ventureList3.length; i++) {
            that.globalModel.DOI2.push(that.globalModel.ventureList3[i]);
          }
          that.getView().getModel("oModel").refresh();
        },
        error: function(err) {
          // handle error
        }
      });
    },
    onPressaddDoi: function() {
      var view = this.getView();
      var that = this;
      if (!that.pErrorLogPopover) {
        that.pErrorLogPopover = Fragment.load({
          id: view.getId(),
          name: "sierra.pra.PRA_Custom.view.collective_doi_header_add",
          controller: that
        }).then(function(oFragment) {
          view.addDependent(oFragment);
          return oFragment;
        });
      }
      that.pErrorLogPopover.then(function(oFragment) {
        oFragment.open();
      });
    },
    onPresscomment: function() {
      var view = this.getView();
      var that = this;
      if (!that.pErrorLogPopover) {
        that.pErrorLogPopover = Fragment.load({
          id: view.getId(),
          name: "sierra.pra.PRA_Custom.view.collective_doi_comments",
          controller: that
        }).then(function(oFragment) {
          view.addDependent(oFragment);
          return oFragment;
        });
      }
      that.pErrorLogPopover.then(function(oFragment) {
        oFragment.open();
      });
    },
    onMarketFreePopup: function() {
      var view = this.getView();
      var that = this;
      if (!that.pErrorLogPopover) {
        that.pErrorLogPopover = Fragment.load({
          id: view.getId(),
          name: "sierra.pra.PRA_Custom.view.collective_doi_market_free",
          controller: that
        }).then(function(oFragment) {
          view.addDependent(oFragment);
          return oFragment;
        });
      }
      that.pErrorLogPopover.then(function(oFragment) {
        oFragment.open();
      });
    },
    onBearerPopup: function() {
      var view = this.getView();
      var that = this;
      if (!that.pErrorLogPopover) {
        that.pErrorLogPopover = Fragment.load({
          id: view.getId(),
          name: "sierra.pra.PRA_Custom.view.collective_doi_bearer_group",
          controller: that
        }).then(function(oFragment) {
          view.addDependent(oFragment);
          return oFragment;
        });
      }
      that.pErrorLogPopover.then(function(oFragment) {
        oFragment.open();
      });
    },
    onCloseMarketFreePopover: function() {
      this.byId("collective_doi_market_free").destroy();
      this.pErrorLogPopover = undefined;
    },
    onClosecomment: function() {
      this.byId("collective_doi_comments").destroy();
      this.pErrorLogPopover = undefined;
    },
    onCloseBearerPopover: function() {
      this.byId("collective_doi_bearer_group").destroy();
      this.pErrorLogPopover = undefined;
    },
    onPressView: function(oEvent) {
      this.getOwnerComponent().getRouter().navTo("payoutPosition");
    },
    onCloseErrorLogPopover: function() {
      this.byId("ErrorLogPopover").destroy();
      this.pErrorLogPopover = undefined;
    },
    onPressFilter: function(oEvent, oParams) {
      var view = this.getView();
      var that = this;
      if (!that.pErrorLogPopover) {
        that.pErrorLogPopover = Fragment.load({
          id: view.getId(),
          name: "sierra.pra.PRA_Custom.view.collective_doi_filter",
          controller: that
        }).then(function(oFragment) {
          view.addDependent(oFragment);
          return oFragment;
        });
      }
      that.pErrorLogPopover.then(function(oFragment) {
        oFragment.open();
      });
    }
  });
});