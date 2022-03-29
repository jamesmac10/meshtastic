import React from "react";
import { IDevice } from "../../data/device";
import { tbeam } from "../../data/devices/tbeam";
import { rak19003 } from "../../data/devices/rak19003";
import Layout from "@theme/Layout";

const Hardware = (): JSX.Element => {
  const [selectedDevice, setSelectedDevice] = React.useState<IDevice>();
  const hardware = [
    tbeam,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
    rak19003,
  ];

  return (
    <Layout title="Hardware" description="Supported hardware">
      <div className="flex flex-grow gap-2 w-full m-auto">
        <div className="flex gap-2 w-2/3 flex-wrap p-4 overflow-y-auto">
          {hardware.map((device) => (
            <div
              className={`flex flex-col rounded-xl shadow-md border-2 bg-primaryDark hover:scale-95 cursor-pointer select-none divide-y transition ease-in-out duration-300 ${
                selectedDevice?.name === device.name
                  ? "border-accent"
                  : "border-secondaryDark"
              }`}
              onClick={() => {
                setSelectedDevice(device);
              }}
            >
              <div className="flex flex-grow">
                <img
                  draggable="false"
                  className="p-4 m-0 w-48"
                  src={device.misc.ImagePath}
                />
                {/* <img
              draggable="false"
              className="mt-auto p-4 m-0 w-48"
              src="/img/hardware/rak/RAK19003.png"
            /> */}
              </div>
              <div className="p-2">
                <div className="font-medium text-lg">{device.name}</div>

                <div className="flex">
                  <div className="rounded-full bg-secondaryDark m-auto w-min px-2 py-0.5 text-sm">
                    {device.specifications.Chipset}
                  </div>
                  {device.features.WiFi && (
                    <div className="rounded-full bg-secondaryDark m-auto w-min px-2 py-0.5 text-sm">
                      WiFi
                    </div>
                  )}
                  {device.features.BLE && (
                    <div className="rounded-full bg-secondaryDark m-auto w-min px-2 py-0.5 text-sm">
                      BLE
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedDevice && (
          <div className="w-1/3 bg-primaryDark rounded-l-xl flex-grow my-4 flex-grow">
            Selected Device {selectedDevice.name}
            <h3>Variants:</h3>
            {selectedDevice.variants.map((varitant) => (
              <div className="">{varitant.name}</div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Hardware;
