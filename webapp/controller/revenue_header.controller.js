sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/Label",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/core/Fragment"
], function(Controller, JSONModel, Label, Filter, FilterOperator, Fragment) {
  "use strict";
  return Controller.extend("sierra.pra.PRA_Custom.controller.revenue_header", {
    onInit: function() {
      var that = this;
      this.globalModel = this.getOwnerComponent().getModel("globalModel");
      var oModel = new JSONModel(this.globalModel);
      oModel.setSizeLimit(500);
      this.getView().setModel(oModel, "oModel");
      this.getOwnerComponent().getModel().read("/Revenue_HDRSet", {
        success: function(data, response) {
          that.globalModel.header = [];
          that.globalModel.companyList = data.results;
          for (var n = 0; n < that.globalModel.companyList.length; n++) {
            that.globalModel.header.push(that.globalModel.companyList[n]);
          }
          that.getView().getModel("oModel").refresh();
          that.aKeys = ["cmp_code", "1", "DECKTYPE", "Venture", "WELLNAME"];
          that.oSelectName = that.getSelect("slName");
          that.oSelectCategory = that.getSelect("slCategory");
          that.oSelectSupplierName = that.getSelect("slDOIType");
          that.oSelectVenture = that.getSelect("slVenture");
          that.oSelectWell = that.getSelect("slWell");
          oModel.setProperty("/Filter/text", "Filtered by None");
          that.addSnappedLabel();
          var filterBar = that.getView().byId("filterbar");
          if (filterBar) {
            filterBar.variantsInitialized();
          }
        },
        error: function(e) {}
      });
      this.getOwnerComponent().getModel().read("/SE_CMP_CODESet", {
        success: function(data, response) {
          that.globalModel.companyCode = data.results;
          that.getView().getModel("oModel").refresh();
        },
        error: function(e) {}
      });
      this.getOwnerComponent().getModel().read("/SE_WELL_IDSet", {
        success: function(data, response) {
          that.globalModel.wellIdList = data.results;
          that.getView().getModel("oModel").refresh();
        },
        error: function(e) {}
      });
      this.getOwnerComponent().getModel().read("/SE_VENTURESet", {
        success: function(data, response) {
          that.globalModel.ventureList = data.results;
          that.getView().getModel("oModel").refresh();
        },
        error: function(e) {}
      });
      this.getOwnerComponent().getModel().read("/SE_DECKTYPESet", {
        success: function(data, response) {
          that.globalModel.deckTypeList = data.results;
          that.getView().getModel("oModel").refresh();
        },
        error: function(e) {}
      });
      this.getOwnerComponent().getModel().read("/SE_PRODUCTSet", {
        success: function(data, response) {
          that.globalModel.productList = data.results;
          that.getView().getModel("oModel").refresh();
        },
        error: function(e) {}
      });
      this.getOwnerComponent().getModel().read("/SE_ENTITYTYPESet", {
        success: function(data, response) {
          that.globalModel.entityTypeList = data.results;
          that.getView().getModel("oModel").refresh();
        },
        error: function(e) {}
      });
      this.getOwnerComponent().getModel().read("/SE_PAYCODESet", {
        success: function(data, response) {
          that.globalModel.payCodeList = data.results;
          that.getView().getModel("oModel").refresh();
        },
        error: function(e) {}
      });
      this.getOwnerComponent().getModel().read("/SE_SUSPENSEREASONSet", {
        success: function(data, response) {
          that.globalModel.suspenseReasonList = data.results;
          that.getView().getModel("oModel").refresh();
        },
        error: function(e) {}
      });
      this.getOwnerComponent().getModel().read("/SE_BANUMBERSet", {
        success: function(data, response) {
          that.globalModel.baNumberList = data.results;
          that.getView().getModel("oModel").refresh();
        },
        error: function(e) {}
      });
      this.getOwnerComponent().getModel().read("/SE_WELLNAMESet", {
        success: function(data, response) {
          that.globalModel.wellNameList = data.results;
          that.getView().getModel("oModel").refresh();
        },
        error: function(e) {}
      });
      this.getOwnerComponent().getModel().read("/SE_OWNERIDSet", {
        success: function(data, response) {
          that.globalModel.ownerIdList = data.results;
          that.getView().getModel("oModel").refresh();
        },
        error: function(e) {}
      });
    },
    onSelectRequestRevenueHeaderList: function(e) {
      var oModel = this.getView().getModel("oModel");
      var selectedPaths = e.getSource()._aSelectedPaths;
      this.globalModel.navigatedRequest = oModel.getProperty(selectedPaths[0]);
      var r = e.getSource()._aSelectedPaths;
      var n = r[0];
      var i = n.slice(n.length - 1);
      this.selectedProgramIndex = parseInt(i);
    },
    onPopinLayoutChanged: function() {
      var productsTable = this.byId("idProductsTable");
      var popinLayout = this.byId("idPopinLayout");
      var selectedKey = popinLayout.getSelectedKey();
      switch (selectedKey) {
        case "Block":
          productsTable.setPopinLayout(PopinLayout.Block);
          break;
        case "GridLarge":
          productsTable.setPopinLayout(PopinLayout.GridLarge);
          break;
        case "GridSmall":
          productsTable.setPopinLayout(PopinLayout.GridSmall);
          break;
        default:
          productsTable.setPopinLayout(PopinLayout.Block);
          break;
      }
    },
    onDisplayForm: function(e) {
      var oModel = this.getView().getModel("oModel");
      this.globalModel.navigationMode = "Display";
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("owner_details", {}, true);
    },
    onDoiHeaderAddPress: function() {
      var view = this.getView();
      var that = this;
      if (!that.pErrorLogPopover) {
        that.pErrorLogPopover = Fragment.load({
          id: view.getId(),
          name: "sierra.pra.PRA_Custom.view.doi_header_add",
          controller: that
        }).then(function(fragment) {
          view.addDependent(fragment);
          return fragment;
        });
      }
      that.pErrorLogPopover.then(function(fragment) {
        fragment.open();
      });
    },
    onCloseErrorLogPopover: function() {
      this.byId("ErrorLogPopover").destroy();
      this.pErrorLogPopover = undefined;
    },
    onExit: function() {
      this.aKeys = [];
      this.aFilters = [];
      this.oModel = null;
    },
    onToggleHeader: function() {
      this.getPage().setHeaderExpanded(!this.getPage().getHeaderExpanded());
    },
    onToggleFooter: function() {
      this.getPage().setShowFooter(!this.getPage().getShowFooter());
    },
    onSelectChange: function() {
      var values = [];
      values.push(this.getSelectedItemText(this.oSelectName));
      values.push(this.getSelectedItemText(this.oSelectCategory));
      values.push(this.getSelectedItemText(this.oSelectSupplierName));
      values.push(this.getSelectedItemText(this.oSelectVenture));
      values.push(this.getSelectedItemText(this.oSelectWell));
      this.filterTable(values);
    },
    filterTable: function(values) {
      this.getTableItems().filter(this.getFilters(values));
      this.updateFilterCriterias(this.getFilterCriteria(values));
    },
    updateFilterCriterias: function(criteria) {
      this.removeSnappedLabel();
      this.addSnappedLabel();
      this.oModel.setProperty("/Filter/text", this.getFormattedSummaryText(criteria));
    },
    addSnappedLabel: function() {
      var label = this.getSnappedLabel();
      label.attachBrowserEvent("click", this.onToggleHeader, this);
      this.getPageTitle().addSnappedContent(label);
    },
    removeSnappedLabel: function() {
      this.getPageTitle().destroySnappedContent();
    },
    getFilters: function(values) {
      this.aFilters = this.aKeys.map(function(key, idx) {
        return new Filter(key, FilterOperator.Contains, values[idx]);
      });
      return this.aFilters;
    },
    getFilterCriteria: function(values) {
      return this.aKeys.filter(function(key, idx) {
        return values[idx] !== "";
      });
    },
    getFormattedSummaryText: function(criteria) {
      if (criteria.length > 0) {
        return "Filtered By (" + criteria.length + "): " + criteria.join(", ");
      } else {
        return "Filtered by None";
      }
    },
    getTable: function() {
      return this.getView().byId("idProductsTable");
    },
    getTableItems: function() {
      return this.getTable().getBinding("items");
    },
    getSelect: function(id) {
      return this.getView().byId(id);
    },
    getSelectedItemText: function(select) {
      return select.getSelectedItem() ? select.getSelectedItem().getKey() : "";
    },
    getPage: function() {
      return this.getView().byId("dynamicPageId");
    },
    getPageTitle: function() {
      return this.getPage().getTitle();
    },
    getSnappedLabel: function() {
      return new Label({ text: "{/Filter/text}" });
    }
  });
});