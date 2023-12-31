import { ElectronicEquipmentConfig } from "../../config/assets.config";
import { GetAllAssets } from "../../services/asset.service";
import { GetCatalog } from "../../services/catalog.service";
import { GetUsers } from "../../services/user.service";

export async function AssetDataLoader() {
  const data = await GetAllAssets();
  const users = await GetUsers();

  const catalogs = await GetCatalog();

  let catalog = catalogs.filter(
    (ctlg) =>
      ctlg.catalogName === ElectronicEquipmentConfig.assetBrandCatalogName
  )[0];

  if (!catalog) {
    catalog = { catalogName: "", catalogOptions: [] };
  }

  return {
    ...data,
    users,
    catalog,
  };
}
