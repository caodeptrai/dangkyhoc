# SƠ ĐỒ BPMN - MERMAID
## Hệ thống Đăng ký Khóa học - Trung tâm Ngoại ngữ Hà Ninh

---

## Hướng dẫn sử dụng trong Draw.io

### Cách 1: Chèn Mermaid trực tiếp vào Draw.io
1. Mở draw.io (https://app.diagrams.net)
2. Chọn **Arrange** → **Insert** → **Advanced** → **Mermaid**
3. Copy và paste code Mermaid bên dưới vào
4. Click **Insert**

### Cách 2: Dùng Mermaid Live Editor
1. Truy cập https://mermaid.live
2. Paste code vào panel trái
3. Click **Export** → **PNG/SVG**
4. Import vào draw.io

### Cách 3: VS Code Preview
1. Cài extension "Mermaid Markdown Syntax Highlighting"
2. Mở file này
3. Right-click → **Open Preview**

---

## 1. UC04 - Đăng ký khóa học

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#2196F3', 'primaryTextColor': '#fff', 'primaryBorderColor': '#1976D2', 'lineColor': '#333333', 'secondaryColor': '#FFC107', 'tertiaryColor': '#f5f5f5'}}}%%
flowchart TB
    subgraph HO["HOC VIEN"]
        A1(("O"))
        A2["Xem chi tiet khoa hoc"]
        A3["Nhan nut Dang ky"]
        A4["Dien form dang ky"]
        A6{"Validation OK?"}
        A7["Thong bao: Dang ky thanh cong"]
        A8["Reset form"]
        A9(("●"))
        A10["Thong bao: Lop da day"]
        A11["Thong bao: Lop da ket thuc"]
    end

    subgraph HT["HE THONG"]
        B1["Hien thi form dang ky"]
        B2["Kiem tra du lieu"]
        B3["Hien thi loi validation"]
        B4["Kiem tra: Lop da ket thuc?"]
        B5["Kiem tra: So HV >= So max?"]
        B6["Tao don dang ky"]
        B7["Luu: Trang thai Cho xac nhan"]
        B8["Luu: So luong hien tai"]
    end

    subgraph AD["ADMIN"]
        C1["Nhan thong bao don moi"]
        C2["Cap nhat trang thai lop hoc"]
    end

    A1 --> A2
    A2 --> A3
    A3 --> B1
    B1 --> A4
    A4 --> B2
    B2 --> A6
    A6 -->|"Hop le"| B4
    A6 -->|"Khong hop le"| B3
    B3 -.->|"Sua lai"| A4
    B4 -->|"Dang hoat dong"| B5
    B4 -->|"Da ket thuc"| A11
    A11 -.->|"Chon lop khac"| A4
    B5 -->|"Con cho"| B6
    B5 -->|"Day roi"| A10
    A10 -.->|"Chon lop khac"| A4
    B6 --> B7
    B7 --> B8
    B8 --> A7
    A7 --> A8
    A8 --> A9
    B7 -.-> C1
    B8 -.-> C2
```

---

## 2. UC11 - Đăng nhập Admin

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#2196F3', 'primaryTextColor': '#fff', 'primaryBorderColor': '#1976D2', 'lineColor': '#333333'}}}%%
flowchart TB
    START(("O"))
    T1["Truy cap trang dang nhap"]
    T2["Hien thi form login"]
    T3["Nhap username va password"]
    G1{"Kiem tra thong tin?"}
    E1["Tai khoan khong ton tai"]
    E2["Mat khau sai"]
    E3["Tai khoan bi khoa"]
    T4["Quay lai nhap lai (toi da 3 lan)"]
    T5["Tao JWT token & session"]
    T6["Chuyen huong Dashboard"]
    END(("●"))

    START --> T1
    T1 --> T2
    T2 --> T3
    T3 --> G1
    G1 -->|"Sai"| E1
    G1 -->|"Sai"| E2
    G1 -->|"Khoa"| E3
    G1 -->|"OK"| T5
    E1 --> T4
    E2 --> T4
    E3 --> T4
    T4 --> T3
    T5 --> T6
    T6 --> END
```

---

## 3. UC15 - Quản lý đơn đăng ký

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#2196F3', 'primaryTextColor': '#fff', 'primaryBorderColor': '#1976D2', 'lineColor': '#333333', 'secondaryColor': '#FFC107'}}}%%
flowchart TB
    subgraph AD["ADMIN"]
        A1(("O"))
        A2["Chon Quan ly dang ky"]
        A3["Tai danh sach don"]
        A5["Chon don dang ky"]
        A6["Thao tac: Duyet/Tu choi"]
        A8["Cap nhat trang thai"]
        A9["Thong bao thanh cong"]
        A10(("●"))
    end

    subgraph HT["HE THONG"]
        B1["Hien thi danh sach"]
        B2["Cap nhat CSDL"]
        B3["Refresh danh sach"]
    end

    subgraph HV["HOC VIEN"]
        C1["Nhan thong bao ket qua"]
    end

    A1 --> A2
    A2 --> A3
    A3 --> B1
    B1 --> A5
    A5 --> A6
    A6 --> A8
    A8 --> B2
    B2 --> B3
    B3 --> A9
    A9 --> A10
    B2 -.-> C1
```

---

## 4. UC05 - Gửi yêu cầu liên hệ

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#2196F3', 'primaryTextColor': '#fff', 'primaryBorderColor': '#1976D2', 'lineColor': '#333333'}}}%%
flowchart TB
    A1(("O"))
    A2["Truy cap trang Lien he"]
    A3["Hien thi form lien he"]
    A4["Dien thong tin"]
    A6{"Validation OK?"}
    A7["Thong bao loi"]
    A8["Luu yeu cau"]
    A9["Trang thai: Chua xu ly"]
    A10["Thong bao: Gui lien he thanh cong"]
    A11["Reset form"]
    A12(("●"))

    A1 --> A2
    A2 --> A3
    A3 --> A4
    A4 --> A6
    A6 -->|"Hop le"| A8
    A6 -->|"Khong hop le"| A7
    A7 -.->|"Sua lai"| A4
    A8 --> A9
    A9 --> A10
    A10 --> A11
    A11 --> A12
```

---

## 5. UC17 - Quản lý bài viết diễn đàn

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#2196F3', 'primaryTextColor': '#fff', 'primaryBorderColor': '#1976D2', 'lineColor': '#333333', 'secondaryColor': '#FFC107'}}}%%
flowchart TB
    subgraph AD["ADMIN"]
        A1(("O"))
        A2["Chon Quan ly dien dan"]
        A3["Tai danh sach bai viet"]
        A4{"Chon thao tac?"}
        A5["Viet bai moi"]
        A6["Sua bai viet"]
        A7["Xoa bai viet"]
        A8["Nhap noi dung bai"]
        A10["Luu: Trang thai Chua cong bo"]
        A11["Toggle Publish ON/OFF"]
        A12["Thong bao thanh cong"]
        A13(("●"))
    end

    subgraph HT["HE THONG"]
        B1["Hien thi danh sach"]
        B2["Xoa khoi CSDL"]
        B3["Refresh danh sach"]
    end

    subgraph KH["KHACH/HOC VIEN"]
        C1["Xem bai viet cong khai"]
        C2["Like/Dislike bai viet"]
    end

    A1 --> A2
    A2 --> A3
    A3 --> B1
    B1 --> A4
    A4 -->|"Viet moi"| A5
    A4 -->|"Sua"| A6
    A4 -->|"Xoa"| A7
    A5 --> A8
    A6 --> A8
    A8 --> A10
    A10 --> A11
    A11 --> A12
    A12 --> A13
    A7 --> B2
    B2 --> B3
    B3 -.-> A12
```

---

## 6. UC06 - Chatbot tư vấn

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#2196F3', 'primaryTextColor': '#fff', 'primaryBorderColor': '#1976D2', 'lineColor': '#333333'}}}%%
flowchart TB
    subgraph USER["NGUOI DUNG"]
        A1(("O"))
        A2["Nhan bieu tuong chatbot"]
        A3["Hien thi cua so chat"]
        A4["Nhap cau hoi"]
        A5["Hien thi phan hoi chatbot"]
        A6{"Tiep tuc hoi?"}
        A7["Dong cua so chat"]
        A8(("●"))
    end

    subgraph BOT["CHATBOT"]
        B1{"Gap tu khoa?"}
        B2["Tim cau tra loi phu hop"]
        B3["Tra loi mac dinh"]
    end

    A1 --> A2
    A2 --> A3
    A3 --> A4
    A4 --> B1
    B1 -->|"Khop"| B2
    B1 -->|"Khong khop"| B3
    B2 --> A5
    B3 --> A5
    A5 --> A6
    A6 -->|"Co"| A4
    A6 -->|"Khong"| A7
    A7 --> A8
```

---

## 7. UC13 - Quản lý khóa học (nâng cấp)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#2196F3', 'primaryTextColor': '#fff', 'primaryBorderColor': '#1976D2', 'lineColor': '#333333', 'secondaryColor': '#FFC107'}}}%%
flowchart TB
    subgraph AD["ADMIN"]
        A1(("O"))
        A2["Chon Quan ly khoa hoc"]
        A3["Tai danh sach khoa hoc"]
        A4{"Chon thao tac?"}
        A5["Them moi"]
        A6["Sua khoa"]
        A7["Xoa khoa"]
        A8["Dien thong tin"]
        A10{"Kiem tra du lieu?"}
        A11["Thong bao loi"]
        A12["Luu vao CSDL"]
        A13["Thong bao thanh cong"]
        A14(("●"))
    end

    subgraph HT["HE THONG"]
        B1["Hien thi danh sach"]
        B2["Kiem tra don dang ky"]
        B3{"Co don lien quan?"}
        B4["Canh bao: Khoa co don"]
        B5["Xoa khoi CSDL"]
        B6["Refresh danh sach"]
    end

    A1 --> A2
    A2 --> A3
    A3 --> B1
    B1 --> A4
    A4 -->|"Them moi"| A5
    A4 -->|"Sua"| A6
    A4 -->|"Xoa"| A7
    A5 --> A8
    A6 --> A8
    A8 --> A10
    A10 -->|"Hop le"| A12
    A10 -->|"Khong hop le"| A11
    A11 -.->|"Sua lai"| A8
    A12 --> A13
    A13 --> A14
    A7 --> B2
    B2 --> B3
    B3 -->|"Co"| B4
    B3 -->|"Khong"| B5
    B4 --> B5
    B5 --> B6
    B6 -.-> A13
```

---

## 8. UC14 - Quản lý giảng viên

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#2196F3', 'primaryTextColor': '#fff', 'primaryBorderColor': '#1976D2', 'lineColor': '#333333', 'secondaryColor': '#FFC107'}}}%%
flowchart TB
    subgraph AD["ADMIN"]
        A1(("O"))
        A2["Chon Quan ly giang vien"]
        A3["Tai danh sach giang vien"]
        A4{"Chon thao tac?"}
        A5["Them giang vien"]
        A6["Sua thong tin"]
        A7["Xoa giang vien"]
        A8["Nhap thong tin"]
        A10{"Email da ton tai?"}
        A11["Thong bao: Email da duoc su dung"]
        A12["Luu vao CSDL"]
        A13["Thong bao thanh cong"]
        A14(("●"))
    end

    subgraph HT["HE THONG"]
        B1["Hien thi danh sach"]
        B2["Kiem tra email"]
        B3{"Xoa giang vien dang day?"}
        B4["Gan instructor_id = NULL"]
        B5["Xoa khoi CSDL"]
        B6["Refresh danh sach"]
    end

    A1 --> A2
    A2 --> A3
    A3 --> B1
    B1 --> A4
    A4 -->|"Them"| A5
    A4 -->|"Sua"| A6
    A4 -->|"Xoa"| A7
    A5 --> A8
    A6 --> A8
    A8 --> A10
    A10 -->|"Chua ton tai"| A12
    A10 -->|"Da ton tai"| A11
    A11 -.->|"Nhap lai"| A8
    A12 --> A13
    A13 --> A14
    A7 --> B3
    B3 -->|"Co"| B4
    B3 -->|"Khong"| B5
    B4 --> B5
    B5 --> B6
    B6 -.-> A13
```

---

## 9. UC16 - Quản lý yêu cầu liên hệ

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#2196F3', 'primaryTextColor': '#fff', 'primaryBorderColor': '#1976D2', 'lineColor': '#333333'}}}%%
flowchart TB
    subgraph AD["ADMIN"]
        A1(("O"))
        A2["Chon Quan ly lien he"]
        A3["Tai danh sach yeu cau"]
        A4["Xem chi tiet yeu cau"]
        A5{"Cap nhat trang thai?"}
        A6["Chua xu ly"]
        A7["Dang xu ly"]
        A8["Da xu ly"]
        A9["Thong bao thanh cong"]
        A10(("●"))
    end

    subgraph HT["HE THONG"]
        B1["Hien thi danh sach"]
        B2["Hien thi popup chi tiet"]
        B3["Cap nhat trang thai"]
        B4["Refresh danh sach"]
    end

    subgraph KH["KHACH/HOC VIEN"]
        C1["Gui yeu cau lien he"]
        C2["Trang thai: Chua xu ly"]
    end

    A1 --> A2
    A2 --> A3
    A3 --> B1
    B1 --> A4
    A4 --> B2
    B2 --> A5
    A5 --> A6
    A5 --> A7
    A5 --> A8
    A6 --> B3
    A7 --> B3
    A8 --> B3
    B3 --> B4
    B4 --> A9
    A9 --> A10
    C1 --> C2
```

---

## 10. UC18 - Quản lý sĩ số & Trạng thái lớp học (MỚI)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#2196F3', 'primaryTextColor': '#fff', 'primaryBorderColor': '#1976D2', 'lineColor': '#333333', 'secondaryColor': '#FFC107'}}}%%
flowchart TB
    subgraph AD["ADMIN"]
        A1(("O"))
        A2["Quan ly khoa hoc"]
        A3["Them/Sua khoa hoc"]
        A4["Nhap: So HV toi da (max_students)"]
        A5["Chon: Trang thai lop hoc"]
        A6["Nhap: Ngay khai giang"]
        A7["Luu vao CSDL"]
        A8["Thong bao thanh cong"]
        A9(("●"))
    end

    subgraph HT["HE THONG"]
        B1["Hien thi danh sach"]
        B2["Tu dong: Sap khai giang"]
        B3["Tu dong: Dang hoc"]
        B4["Tu dong: Ket thuc"]
        B5["Danh sach lop: So HV / So max"]
        B6["Kiem tra so HV hien tai"]
        B7["Tu dong: Cap nhat trang thai"]
    end

    subgraph HV["HOC VIEN"]
        C1["Xem trang thai lop hoc"]
        C2["Xem so cho trong"]
        C3["Dang ky (neu con cho)"]
        C4["Khong the dang ky (day/ket thuc)"]
    end

    A1 --> A2
    A2 --> A3
    A3 --> A4
    A3 --> A5
    A3 --> A6
    A4 --> A7
    A5 --> A7
    A6 --> A7
    A7 --> A8
    A8 --> A9
    A9 -.-> B1
    B1 --> B2
    B1 --> B3
    B1 --> B4
    B2 --> B5
    B3 --> B5
    B4 --> B5
    B5 --> B6
    B6 --> B7
    B5 -.-> C1
    B5 -.-> C2
    B5 -.-> C3
    B5 -.-> C4
```

---

## State Diagrams

### Trạng thái lớp học (MỚI)

```mermaid
stateDiagram-v2
    [*] --> SapKhaiGiang: Tao moi / Chua den ngay
    SapKhaiGiang --> DangHoc: Den ngay khai giang
    DangHoc --> KetThuc: Het thoi gian khoa hoc
    DangHoc --> SapKhaiGiang: Huy / Chua bat dau
    SapKhaiGiang --> [*]: Xoa lop
    DangHoc --> [*]: Xoa lop
    KetThuc --> [*]: Xoa lop
```

### Trạng thái đơn đăng ký

```mermaid
stateDiagram-v2
    [*] --> ChoXacNhan: Tao moi
    ChoXacNhan --> DaXacNhan: Admin duyet
    ChoXacNhan --> TuChoi: Admin tu choi
    ChoXacNhan --> DaHuy: Hoc vien huy
    DaXacNhan --> [*]: Hoan thanh
    TuChoi --> [*]: Ket thuc
    DaHuy --> [*]: Ket thuc
```

### Trạng thái xử lý liên hệ

```mermaid
stateDiagram-v2
    [*] --> ChuaXuLy: Gui yeu cau
    ChuaXuLy --> DangXuLy: Admin tiep nhan
    DangXuLy --> DaXuLy: Hoan thanh
    DaXuLy --> [*]: Ket thuc
```

---

## Sequence Diagrams

### UC04 - Đăng ký khóa học (nâng cấp)

```mermaid
sequenceDiagram
    participant HV as Hoc vien
    participant HT as He thong
    participant AD as Admin

    HV->>HT: Nhan "Dang ky ngay"
    HT->>HT: Kiem tra: Lop ket thuc?
    alt Lop da ket thuc
        HT->>HV: "Lop da ket thuc, khong the dang ky"
    else Lop con hoat dong
        HT->>HT: Kiem tra: So HV >= So max?
        alt Day roi
            HT->>HV: "Lop da day, vui long chon lop khac"
        else Con cho
            HT->>HV: Hien thi form dang ky
            HV->>HT: Dien thong tin & gui
            HT->>HT: Kiem tra validation
            alt Du lieu hop le
                HT->>HT: Tao don dang ky
                HT->>HT: Luu: "Cho xac nhan"
                HT->>HT: Tang so luong hien tai
                HT->>HT: Kiem tra: Lop day chua?
                HT->>HV: Thong bao thanh cong
                HT->>AD: Gui thong bao don moi
            else Du lieu khong hop le
                HT->>HV: Hien thi loi cu the
            end
        end
    end
```

---

## Tổng kết

| STT | Ma | Ten quy trinh |
|-----|-----|---------------|
| 1 | UC04 | Dang ky khoa hoc |
| 2 | UC11 | Dang nhap Admin |
| 3 | UC15 | Quan ly don dang ky |
| 4 | UC05 | Gui yeu cau lien he |
| 5 | UC17 | Quan ly bai viet dien dan |
| 6 | UC06 | Chatbot tu van |
| 7 | UC13 | Quan ly khoa hoc |
| 8 | UC14 | Quan ly giang vien |
| 9 | UC16 | Quan ly yeu cau lien he |
| 10 | UC18 | Quan ly si so & Trang thai lop hoc (MOI) |

---

## Lưu ý

- Copy code từng sơ đồ riêng biệt
- Paste vào draw.io qua **Arrange → Insert → Advanced → Mermaid**
- Hoặc dùng https://mermaid.live để xem trực tiếp
